(function () {
  const state = {
    renderer: null,
    scene: null,
    camera: null,
    root: null,
    labelEntries: []
  };

  const omittedRegions = new Set(["台湾省", "香港特别行政区", "澳门特别行政区"]);
  const shortName = (name) => name.replace(/省|市|壮族自治区|回族自治区|维吾尔自治区|自治区/g, "");
  const formatNumber = new Intl.NumberFormat("zh-CN");

  function hash(value) {
    let result = 2166136261;
    for (let index = 0; index < value.length; index += 1) {
      result ^= value.charCodeAt(index);
      result = Math.imul(result, 16777619);
    }
    return (result >>> 0) / 4294967295;
  }

  function noise2d(x, y, seed) {
    const value = Math.sin(x * 12.9898 + y * 78.233 + seed * 157.31) * 43758.5453;
    return value - Math.floor(value);
  }

  function fbm(x, y, seed) {
    let amplitude = 0.55;
    let frequency = 0.018;
    let total = 0;
    let weight = 0;
    for (let octave = 0; octave < 4; octave += 1) {
      total += amplitude * noise2d(x * frequency, y * frequency, seed + octave * 0.19);
      weight += amplitude;
      amplitude *= 0.5;
      frequency *= 2.15;
    }
    return weight ? total / weight : 0;
  }

  function smoothstep(edge0, edge1, value) {
    const t = Math.max(0, Math.min(1, (value - edge0) / (edge1 - edge0 || 1e-6)));
    return t * t * (3 - 2 * t);
  }

  function ringArea(ring) {
    let area = 0;
    for (let index = 0; index < ring.length; index += 1) {
      const [x1, y1] = ring[index];
      const [x2, y2] = ring[(index + 1) % ring.length];
      area += x1 * y2 - x2 * y1;
    }
    return Math.abs(area / 2);
  }

  function centroid(ring) {
    let area = 0;
    let x = 0;
    let y = 0;
    for (let index = 0; index < ring.length; index += 1) {
      const [x1, y1] = ring[index];
      const [x2, y2] = ring[(index + 1) % ring.length];
      const cross = x1 * y2 - x2 * y1;
      area += cross;
      x += (x1 + x2) * cross;
      y += (y1 + y2) * cross;
    }
    const normalized = area / 2;
    return normalized ? [x / (6 * normalized), y / (6 * normalized)] : ring[0];
  }

  function pointInPolygon(point, ring) {
    let inside = false;
    const [px, py] = point;
    for (let index = 0, previousIndex = ring.length - 1; index < ring.length; previousIndex = index, index += 1) {
      const [x1, y1] = ring[index];
      const [x2, y2] = ring[previousIndex];
      const intersects = ((y1 > py) !== (y2 > py))
        && (px < ((x2 - x1) * (py - y1)) / ((y2 - y1) || 1e-6) + x1);
      if (intersects) inside = !inside;
    }
    return inside;
  }

  function distanceToEdge(center, angle, ring) {
    const [cx, cy] = center;
    const dx = Math.cos(angle);
    const dy = Math.sin(angle);
    let best = Infinity;
    for (let index = 0; index < ring.length; index += 1) {
      const [x1, y1] = ring[index];
      const [x2, y2] = ring[(index + 1) % ring.length];
      const sx = x2 - x1;
      const sy = y2 - y1;
      const denominator = dx * sy - dy * sx;
      if (Math.abs(denominator) < 1e-6) continue;
      const qx = x1 - cx;
      const qy = y1 - cy;
      const t = (qx * sy - qy * sx) / denominator;
      const u = (qx * dy - qy * dx) / denominator;
      if (t > 0 && u >= 0 && u <= 1) {
        best = Math.min(best, t);
      }
    }
    return Number.isFinite(best) ? best : 0;
  }

  function densify(ring, stepSize = 3.5) {
    const cleaned = ring[0] && ring[ring.length - 1]
      && ring[0][0] === ring[ring.length - 1][0]
      && ring[0][1] === ring[ring.length - 1][1]
      ? ring.slice(0, -1)
      : ring.slice();
    const points = [];
    for (let index = 0; index < cleaned.length; index += 1) {
      const current = cleaned[index];
      const next = cleaned[(index + 1) % cleaned.length];
      const distance = Math.hypot(next[0] - current[0], next[1] - current[1]);
      const steps = Math.max(1, Math.ceil(distance / stepSize));
      for (let step = 0; step < steps; step += 1) {
        const t = step / steps;
        points.push([
          current[0] + (next[0] - current[0]) * t,
          current[1] + (next[1] - current[1]) * t
        ]);
      }
    }
    return points;
  }

  function boundsOfGeoJson(geoJson) {
    const bounds = { minLng: Infinity, maxLng: -Infinity, minLat: Infinity, maxLat: -Infinity };
    (geoJson.features || []).forEach((feature) => {
      if (omittedRegions.has(feature.properties?.name)) return;
      const stack = [feature.geometry.coordinates];
      while (stack.length) {
        const next = stack.pop();
        if (!Array.isArray(next)) continue;
        if (typeof next[0] === "number") {
          bounds.minLng = Math.min(bounds.minLng, next[0]);
          bounds.maxLng = Math.max(bounds.maxLng, next[0]);
          bounds.minLat = Math.min(bounds.minLat, next[1]);
          bounds.maxLat = Math.max(bounds.maxLat, next[1]);
        } else {
          next.forEach((item) => stack.push(item));
        }
      }
    });
    return bounds;
  }

  function projector(bounds) {
    const centerLng = (bounds.minLng + bounds.maxLng) / 2;
    const centerLat = (bounds.minLat + bounds.maxLat) / 2;
    return ([lng, lat]) => [
      (lng - centerLng) * 18.6,
      (lat - centerLat) * 24.2
    ];
  }

  function outerRings(geometry) {
    if (!geometry) return [];
    if (geometry.type === "Polygon") {
      return geometry.coordinates.slice(0, 1).filter((ring) => ring.length >= 3);
    }
    if (geometry.type === "MultiPolygon") {
      return geometry.coordinates.map((polygon) => polygon[0]).filter((ring) => ring?.length >= 3);
    }
    return [];
  }

  function palette(ratio, isPeak) {
    if (isPeak || ratio >= 0.82) {
      return { base: "#40210a", mid: "#dc7115", light: "#ffad3b", crest: "#ffd178", line: "#ffce84", label: "#fff1cd" };
    }
    if (ratio >= 0.52) {
      return { base: "#14331f", mid: "#52a15a", light: "#98dc73", crest: "#d5f299", line: "#d9f1a8", label: "#f0ffd2" };
    }
    if (ratio >= 0.24) {
      return { base: "#083145", mid: "#1f8ea4", light: "#63d2da", crest: "#aeeeed", line: "#9feaf1", label: "#dbffff" };
    }
    return { base: "#092544", mid: "#235ea9", light: "#65a7ec", crest: "#a9d4ff", line: "#9fc7f0", label: "#e7f3ff" };
  }

  function lerpColor(a, b, t) {
    return a.clone().lerp(b, t);
  }

  function createShapeMesh(ring, color, opacity, z) {
    const shape = new THREE.Shape();
    ring.forEach(([x, y], index) => {
      if (index === 0) shape.moveTo(x, y);
      else shape.lineTo(x, y);
    });
    shape.closePath();
    const geometry = new THREE.ShapeGeometry(shape);
    geometry.translate(0, 0, z);
    return new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
      color: new THREE.Color(color),
      transparent: true,
      opacity,
      side: THREE.DoubleSide,
      depthWrite: false
    }));
  }

  function edgeKey(a, b) {
    const normalize = (point) => `${Math.round(point[0] * 100) / 100},${Math.round(point[1] * 100) / 100}`;
    const first = normalize(a);
    const second = normalize(b);
    return first < second ? `${first}|${second}` : `${second}|${first}`;
  }

  function createNationalOutline(rings, z) {
    const edges = new Map();
    rings.forEach((ring) => {
      ring.forEach((point, index) => {
        const next = ring[(index + 1) % ring.length];
        const key = edgeKey(point, next);
        const current = edges.get(key);
        if (current) current.count += 1;
        else edges.set(key, { count: 1, point, next });
      });
    });

    const points = [];
    edges.forEach((edge) => {
      if (edge.count !== 1) return;
      points.push(edge.point[0], edge.point[1], z, edge.next[0], edge.next[1], z);
    });

    const group = new THREE.Group();
    if (!points.length) return group;

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(points, 3));
    group.add(new THREE.LineSegments(geometry, new THREE.LineBasicMaterial({
      color: 0x020305,
      transparent: true,
      opacity: 0.96,
      linewidth: 3
    })));
    group.add(new THREE.LineSegments(geometry.clone(), new THREE.LineBasicMaterial({
      color: 0x73f4ff,
      transparent: true,
      opacity: 0.5,
      linewidth: 2
    })));
    group.add(new THREE.LineSegments(geometry.clone(), new THREE.LineBasicMaterial({
      color: 0x1bbbd0,
      transparent: true,
      opacity: 0.22,
      linewidth: 6
    })));
    return group;
  }

  function buildMountain(ring, item, maxValue) {
    const value = item.value || 0;
    const ratio = value > 0 ? Math.sqrt(value / Math.max(maxValue, 1)) : 0;
    const colors = palette(ratio, item.isPeak);
    const denseRing = densify(ring);
    const center = pointInPolygon(item.coord, denseRing) ? item.coord : centroid(denseRing);
    const group = new THREE.Group();
    const baseHeight = 5.5;

    group.add(createShapeMesh(denseRing, colors.mid, value > 0 ? 0.16 : 0.12, baseHeight));
    const outline = denseRing.map(([x, y]) => new THREE.Vector3(x, y, baseHeight + 0.45));
    group.add(new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(outline), new THREE.LineBasicMaterial({
      color: 0x020202,
      transparent: true,
      opacity: 0.86
    })));
    group.add(new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(outline.map((point) => point.clone().setZ(point.z + 0.55))), new THREE.LineBasicMaterial({
      color: new THREE.Color(colors.line),
      transparent: true,
      opacity: value > 0 ? 0.2 : 0.09
    })));

    if (!value) {
      return { group, anchor: new THREE.Vector3(center[0], center[1], baseHeight + 0.8), labelColor: colors.label };
    }

    const seed = hash(item.name);
    const radialSegments = 112;
    const levels = 34;
    const maxHeight = 22 + ratio * 92;
    const baseColor = new THREE.Color(colors.base);
    const midColor = new THREE.Color(colors.mid);
    const lightColor = new THREE.Color(colors.light);
    const crestColor = new THREE.Color(colors.crest);
    const vertices = [];
    const vertexColors = [];
    const indices = [];
    const edgeDistances = [];
    let peakPosition = new THREE.Vector3(center[0], center[1], baseHeight);

    for (let segment = 0; segment < radialSegments; segment += 1) {
      edgeDistances.push(distanceToEdge(center, (segment / radialSegments) * Math.PI * 2, denseRing));
    }

    const peakOffsets = [
      [0, 0, 0.72],
      [Math.cos(seed * 7.1) * 0.26, Math.sin(seed * 5.6) * 0.26, 0.34],
      [Math.cos(seed * 11.4 + 1.7) * 0.42, Math.sin(seed * 9.3 + 0.8) * 0.42, 0.2]
    ];

    for (let level = 0; level <= levels; level += 1) {
      const t = level / levels;
      const ridgeT = Math.pow(t, 0.9);
      for (let segment = 0; segment < radialSegments; segment += 1) {
        const angle = (segment / radialSegments) * Math.PI * 2;
        const edgeDistance = edgeDistances[segment];
        const edgeHold = smoothstep(0.86, 1, t);
        const wobble = 1 + (fbm(Math.cos(angle) * 90, Math.sin(angle) * 90, seed + level * 0.03) - 0.5) * 0.04 * Math.sin(Math.PI * t) * (1 - edgeHold);
        const radius = edgeDistance * ridgeT * wobble;
        const x = center[0] + Math.cos(angle) * radius;
        const y = center[1] + Math.sin(angle) * radius;
        const nx = Math.cos(angle) * ridgeT;
        const ny = Math.sin(angle) * ridgeT;
        const inner = 1 - t;
        const boundaryRamp = smoothstep(0.16, 0.58, inner);
        const radialFalloff = Math.pow(inner, 1.05);
        const axis = seed * Math.PI * 2;
        const across = -nx * Math.sin(axis) + ny * Math.cos(axis);
        const along = nx * Math.cos(axis) + ny * Math.sin(axis);
        const mainRidge = Math.exp(-(across * across) * 44 - (along * along) * 2.2);
        const secondRidge = Math.exp(-((-nx * Math.sin(axis + 1.05) + ny * Math.cos(axis + 1.05)) ** 2) * 56 - ((nx * Math.cos(axis + 1.05) + ny * Math.sin(axis + 1.05)) ** 2) * 3.2);
        const rock = fbm(x * 3.1, y * 3.1, seed + 0.4);
        const smallRock = fbm(x * 10.8, y * 10.8, seed + 1.7);
        const tipMask = smoothstep(0.1, 0.86, 1 - t);
        const peakBlend = peakOffsets.reduce((sum, peak) => {
          const dx = nx - peak[0];
          const dy = ny - peak[1];
          return sum + Math.exp(-(dx * dx + dy * dy) * 8.5) * peak[2];
        }, 0);
        const ridgeNetwork = (mainRidge * 0.2 + secondRidge * 0.12) * radialFalloff;
        const heightRatio = Math.min(1.08, (
          radialFalloff * 0.34
          + peakBlend * radialFalloff * 0.26
          + ridgeNetwork
          + Math.max(0, rock - 0.5) * radialFalloff * 0.1
          + (smallRock - 0.5) * radialFalloff * 0.035
        ) * tipMask * boundaryRamp);
        const height = baseHeight + maxHeight * heightRatio;
        if (height > peakPosition.z) {
          peakPosition = new THREE.Vector3(x, y, height + 3.5);
        }
        vertices.push(x, y, height);

        const veinNoise = fbm(x * 7.2 + Math.sin(y * 0.05) * 18, y * 1.9 + rock * 15, seed + 0.9);
        const vein = Math.pow(Math.max(0, 1 - Math.abs(veinNoise * 2 - 1) * 11.5), 4.6) * 0.12;
        const shade = Math.max(0, 0.62 - rock) * 0.24;
        const elevationTone = Math.max(0, Math.min(1, heightRatio));
        const valueTint = Math.max(0.16, ratio);
        const slopeColor = elevationTone < 0.18
          ? lerpColor(lightColor, midColor, elevationTone / 0.18)
          : elevationTone < 0.82
            ? lerpColor(midColor, baseColor, (elevationTone - 0.18) / 0.64)
            : lerpColor(baseColor, crestColor, (elevationTone - 0.82) / 0.18);
        slopeColor.lerp(midColor, 0.08 + valueTint * 0.08);
        const finalColor = vein > 0.012
          ? lerpColor(slopeColor, crestColor, vein)
          : lerpColor(slopeColor, baseColor, shade);
        vertexColors.push(finalColor.r, finalColor.g, finalColor.b);
      }
    }

    for (let level = 0; level < levels; level += 1) {
      const current = level * radialSegments;
      const next = (level + 1) * radialSegments;
      for (let segment = 0; segment < radialSegments; segment += 1) {
        const a = current + segment;
        const b = current + ((segment + 1) % radialSegments);
        const c = next + segment;
        const d = next + ((segment + 1) % radialSegments);
        indices.push(a, c, b, b, c, d);
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setAttribute("color", new THREE.Float32BufferAttribute(vertexColors, 3));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    group.add(new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.63,
      roughness: 0.48,
      metalness: 0.02,
      emissive: new THREE.Color(colors.line),
      emissiveIntensity: 0.055,
      side: THREE.DoubleSide
    })));

    [0.28, 0.48, 0.68, 0.84].forEach((t) => {
      const points = [];
      const level = Math.round(t * levels);
      for (let segment = 0; segment < radialSegments; segment += 1) {
        const offset = (level * radialSegments + segment) * 3;
        points.push(new THREE.Vector3(vertices[offset], vertices[offset + 1], vertices[offset + 2] + 0.35));
      }
      group.add(new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(points), new THREE.LineBasicMaterial({
        color: new THREE.Color(colors.line),
        transparent: true,
        opacity: 0.1
      })));
    });

    return {
      group,
      anchor: peakPosition,
      labelColor: colors.label
    };
  }

  function ensureScene(container) {
    if (!window.THREE) return false;
    if (!state.renderer) {
      state.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      state.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      container.innerHTML = "";
      container.appendChild(state.renderer.domElement);
      state.scene = new THREE.Scene();
      state.camera = new THREE.PerspectiveCamera(32, 1, 1, 3200);
      state.root = new THREE.Group();
      state.scene.add(state.root);
      const ambient = new THREE.AmbientLight(0x9fefff, 1.08);
      const key = new THREE.DirectionalLight(0xffffff, 1.05);
      key.position.set(180, -240, 320);
      const rim = new THREE.DirectionalLight(0x48d8ff, 0.72);
      rim.position.set(-260, 160, 160);
      state.scene.add(ambient, key, rim);
    }
    const width = container.clientWidth || 1200;
    const height = container.clientHeight || 760;
    state.renderer.setSize(width, height, false);
    state.camera.aspect = width / height;
    state.camera.updateProjectionMatrix();
    return true;
  }

  function clear(labelsContainer) {
    if (state.root) {
      state.root.traverse((node) => {
        node.geometry?.dispose?.();
        if (Array.isArray(node.material)) node.material.forEach((material) => material.dispose?.());
        else node.material?.dispose?.();
      });
      state.root.clear();
    }
    if (labelsContainer) labelsContainer.innerHTML = "";
    state.labelEntries = [];
  }

  function createLabel(text, color) {
    const label = document.createElement("div");
    label.className = "footprint-label";
    label.innerHTML = `
      <span class="footprint-label__name">${text.split("\n")[0]}</span><br/>
      <span class="footprint-label__value">${text.split("\n")[1]}</span>
    `;
    label.style.color = color;
    label.querySelector(".footprint-label__value").style.color = color;
    return label;
  }

  function updateLabels() {
    if (!state.renderer || !state.camera) return;
    const rect = state.renderer.domElement.getBoundingClientRect();
    state.labelEntries.forEach((entry) => {
      const projected = entry.position.clone().project(state.camera);
      const visible = projected.z > -1 && projected.z < 1;
      entry.element.style.display = visible ? "" : "none";
      if (!visible) return;
      entry.element.style.left = `${(projected.x * 0.5 + 0.5) * rect.width}px`;
      entry.element.style.top = `${(-projected.y * 0.5 + 0.5) * rect.height}px`;
    });
  }

  function render(options) {
    const { container, labelsContainer, geoJson, provinceData } = options;
    if (!container || !geoJson || !ensureScene(container)) return false;
    clear(labelsContainer);
    const bounds = boundsOfGeoJson(geoJson);
    const project = projector(bounds);
    const valueMap = new Map((provinceData || []).map((item) => [item.name, item]));
    const maxValue = Math.max(1, ...(provinceData || []).map((item) => item.value || 0));
    const topProvince = (provinceData || []).reduce((winner, item) => {
      if (!winner || (item.value || 0) > (winner.value || 0)) return item;
      return winner;
    }, null);
    const items = [];
    const mapGroup = new THREE.Group();
    const provinceRings = [];

    (geoJson.features || []).forEach((feature) => {
      const name = feature.properties?.name;
      if (!name || omittedRegions.has(name)) return;
      const source = valueMap.get(name);
      const value = source?.value || 0;
      const coord = project(source?.coord || feature.properties?.centroid || feature.properties?.center || [104.2, 35.8]);
      const rings = outerRings(feature.geometry)
        .map((ring) => ring.map(project))
        .filter((ring) => ring.length >= 3)
        .sort((a, b) => ringArea(b) - ringArea(a));
      if (!rings.length) return;
      const largest = ringArea(rings[0]);
      rings.filter((ring, index) => index === 0 && ringArea(ring) >= largest * 0.025).forEach((ring, index) => {
        provinceRings.push(ring);
        const built = buildMountain(ring, { name, value, coord, isPeak: topProvince?.name === name }, maxValue);
        mapGroup.add(built.group);
        if (index === 0 && value > 0) {
          items.push({ name, value, anchor: built.anchor, labelColor: built.labelColor });
        }
      });
    });

    mapGroup.add(createNationalOutline(provinceRings, 9.4));

    mapGroup.rotation.z = -0.18;
    state.root.add(mapGroup);
    const fitItems = mapGroup.children.filter((child) => child.userData?.name !== "海南省");
    const boundsBox = new THREE.Box3().setFromObject(mapGroup);
    const center = boundsBox.getCenter(new THREE.Vector3());
    mapGroup.position.set(-center.x, -center.y, -4);
    const fitted = new THREE.Box3().setFromObject(mapGroup);
    const size = fitted.getSize(new THREE.Vector3());
    const fittedCenter = fitted.getCenter(new THREE.Vector3());
    const verticalFov = (state.camera.fov * Math.PI) / 180;
    const horizontalFov = 2 * Math.atan(Math.tan(verticalFov / 2) * state.camera.aspect);
    const distance = Math.max(
      size.y / (2 * Math.tan(verticalFov / 2)),
      size.x / (2 * Math.tan(horizontalFov / 2))
    ) * 0.72;
    state.camera.position.set(0, -distance * 0.92, distance * 0.42 + size.z * 0.68);
    state.camera.lookAt(fittedCenter.x, fittedCenter.y - size.y * 0.02, size.z * 0.24);
    state.root.updateMatrixWorld(true);

    state.labelEntries = items.map((item) => {
      const element = createLabel(`${shortName(item.name)}\n${formatNumber.format(item.value)} 台`, item.labelColor);
      labelsContainer.appendChild(element);
      return { element, position: item.anchor.clone().applyMatrix4(mapGroup.matrixWorld) };
    });
    state.renderer.render(state.scene, state.camera);
    updateLabels();
    return true;
  }

  window.Footprint3D = { render };
})();
