(() => {
  "use strict";
  const { key, defaults, ranges, normalize } = globalThis.YTLayoutSettings;
  const form = document.getElementById("settings");
  const options = document.getElementById("layout-options");
  const status = document.getElementById("status");
  const fields = Object.keys(defaults);
  let pending = Promise.resolve();
  let saveNumber = 0;

  function showValue(input) {
    if (input.type === "range") document.getElementById(`${input.name}-value`).textContent = `${input.value} px`;
  }

  function display(value) {
    const settings = normalize(value);
    for (const name of fields) {
      const input = form.elements.namedItem(name);
      if (input.type === "checkbox") input.checked = settings[name];
      else input.value = settings[name];
      showValue(input);
    }
    options.disabled = !settings.enabled;
  }
  function collect() {
    return normalize(Object.fromEntries(fields.map(name => {
      const input = form.elements.namedItem(name);
      return [name, input.type === "checkbox" ? input.checked : input.type === "range" ? Number(input.value) : input.value];
    })));
  }
  function save(value) {
    const number = ++saveNumber;
    status.textContent = "Сохранение…";
    // Serialize rapid changes so an older write cannot replace a newer choice.
    pending = pending.catch(() => {}).then(() => chrome.storage.local.set({ [key]: value }));
    pending.then(() => {
      if (number === saveNumber) status.textContent = "Сохранено";
    }).catch(() => {
      if (number === saveNumber) status.textContent = "Не удалось сохранить. Попробуйте ещё раз.";
    });
  }
  form.addEventListener("submit", event => event.preventDefault());
  // Dragging changes only the label. Commit on change (release / keyboard step).
  form.addEventListener("input", event => showValue(event.target));
  form.addEventListener("change", () => {
    const value = collect();
    options.disabled = !value.enabled;
    save(value);
  });
  document.getElementById("reset").addEventListener("click", () => {
    display(defaults);
    save({ ...defaults });
  });
  document.getElementById("reset-appearance").addEventListener("click", () => {
    const value = collect();
    for (const name of Object.keys(ranges)) value[name] = defaults[name];
    display(value);
    save(value);
  });
  form.inert = true;
  chrome.storage.local.get(key).then(result => display(result[key])).catch(() => {
    display(defaults);
    status.textContent = "Не удалось прочитать настройки.";
  }).finally(() => { form.inert = false; });
})();
