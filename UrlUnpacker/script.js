// Recursive function to unpack a URI and its parameters
function unpackUri(uri) {
  try {
    const urlObj = new URL(uri);
    const result = {
      protocol: urlObj.protocol.replace(':', ''),
      url: urlObj.host,
      path: urlObj.pathname,
      params: [],
    };
    // Parse normal query params
    urlObj.searchParams.forEach((value, key) => {
      let paramDecoded = decodeURIComponent(value);
      let paramObj = { key, value: paramDecoded };
      try {
        if (/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(paramDecoded)) {
          paramObj.isUri = true;
          paramObj.uriData = unpackUri(paramDecoded);
        }
      } catch {}
      result.params.push(paramObj);
    });

    // Handle fragment (hash) with or without query params
    if (urlObj.hash) {
      let frag = urlObj.hash.substring(1);
      if (frag) {
        let [fragPath, fragQuery] = frag.split('?');
        result.fragment = fragPath;
        if (fragQuery) {
          // Parse fragment query params using URLSearchParams
          const fragParams = new URLSearchParams(fragQuery);
          fragParams.forEach((value, key) => {
            let paramDecoded = decodeURIComponent(value);
            let paramObj = { key, value: paramDecoded };
            try {
              if (/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(paramDecoded)) {
                paramObj.isUri = true;
                paramObj.uriData = unpackUri(paramDecoded);
              }
            } catch {}
            result.params.push(paramObj);
          });
        }
      }
    }
    return result;
  } catch {}
}

// Render the unpacked URI data recursively
function renderResult(data, level = 0) {
  if (data.error) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error';
    errorDiv.textContent = data.error;
    return errorDiv;
  }
  // Generate a random light color for border for each level
  function randomLightColor(seed) {
    const colors = [
      '#e3eaf2',
      '#ffe0b2',
      '#e1bee7',
      '#c8e6c9',
      '#f8bbd0',
      '#b3e5fc',
      '#fff9c4',
      '#dcedc8',
      '#f0f4c3',
      '#f5f5f5',
    ];
    return colors[seed % colors.length];
  }
  let borderColor = randomLightColor(level);
  const template = document.getElementById('uri-template');
  const node = template.content.cloneNode(true);
  const paramDiv = node.querySelector('.param');
  paramDiv.style.setProperty('--border-color', borderColor);
  node.querySelector('.protocol').textContent = data.protocol;
  node.querySelector('.url').textContent = data.url;
  node.querySelector('.path').textContent = data.path;
  if (data.fragment) {
    node.querySelector('.field-fragment').style.display = '';
    node.querySelector('.fragment').style.display = '';
    node.querySelector('.fragment').textContent = `#${data.fragment}`;
  }
  if (data.params.length) {
    node.querySelector('.field-param').style.display = '';
    const paramList = node.querySelector('.param-list');
    data.params.forEach((param) => {
      const paramListDescription = document.createElement('dt');
      paramListDescription.className = 'field-param';
      paramListDescription.innerHTML = `${param.key}:`;
      const infoDetail = document.createElement('dd');
      infoDetail.innerHTML = `<span class="field-param-value">${param.value}</span>`;
      if (param.isUri && param.uriData) {
        const nextLevel = level + 1;
        infoDetail.classList.add('nested');
        // Set the next border color for nested
        infoDetail.style.setProperty(
          '--border-color',
          randomLightColor(nextLevel),
        );
        infoDetail.appendChild(renderResult(param.uriData, nextLevel));
      }
      paramList.appendChild(paramListDescription);
      paramList.appendChild(infoDetail);
    });
  }
  return node;
}

const textarea = document.querySelector('textarea');
textarea.style.height = `${textarea.scrollHeight + 16}px`;
textarea.addEventListener('input', () => {
  textarea.style.height = `${textarea.scrollHeight}px`;
});

document.getElementById('decodeBtn').addEventListener('click', function () {
  const input = document.getElementById('uriInput').value.trim();
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = '';
  if (!input) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error';
    errorDiv.textContent = 'Please enter a URI.';
    resultDiv.appendChild(errorDiv);
    return;
  }
  const unpacked = unpackUri(input);
  const resultNode = renderResult(unpacked);
  resultDiv.appendChild(resultNode);
});
