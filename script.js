import OBR from "https://cdn.jsdelivr.net/npm/@owlbear-rodeo/sdk/dist/obr.min.js";

async function spawnItemsFromList(names) {
  const center = await OBR.viewport.getCenter();
  const itemsToAdd = [];

  for (let name of names) {
    name = name.trim();
    if (!name) continue;

    const results = await OBR.assets.search(name);

    if (results.length === 0) {
      console.warn(`No asset found for: ${name}`);
      continue;
    }

    const asset = results[0];

    const newItem = {
      type: asset.type,
      name: asset.name,
      image: asset.url,
      metadata: asset.metadata || {},
      position: center,   // spawn at scene center
      scale: 1
    };

    itemsToAdd.push(newItem);
  }

  if (itemsToAdd.length > 0) {
    await OBR.scene.items.addItems(itemsToAdd);
  }
}

document.getElementById("spawn").addEventListener("click", () => {
  const raw = document.getElementById("itemList").value;
  const names = raw.split("\n");
  spawnItemsFromList(names);
});
