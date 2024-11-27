const select = document.getElementById("weapon");
const buttonForm = document.getElementById("sort-click");
const imageSkin = document.getElementById("img-skin");
const nameSkin = document.getElementById("name-skin");

const getWeapons = async () => {
  const response = await fetch("https://valorant-api.com/v1/weapons");

  const json = await response.json();

  return json.data;
};

const populateWeapon = async () => {
  const weapons = await getWeapons();

  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = "Selecione uma arma";
  select.appendChild(defaultOption);

  weapons.map((weapon) => {
    const option = document.createElement("option");

    option.value = weapon.uuid;
    option.textContent = weapon.displayName;

    select.appendChild(option);
  });
};

const getSelectedOption = async () => {
  const selectedValue = select.value;

  if (!selectedValue) {
    return nameSkin.value = ("arma nao encontrada");
  }

  const weapons = await getWeapons();

  const selectedWeapon = weapons.find(
    (weapon) => weapon.uuid === selectedValue
  );

  return selectedWeapon;
};

const randomSkin = async () => {
  const selectedWeapon = await getSelectedOption();


  const randomIndex = Math.floor(Math.random() * selectedWeapon.skins.length);
  const randomSkin = selectedWeapon.skins[randomIndex];

  console.log(randomSkin);

  imageSkin.src = randomSkin.displayIcon;
  imageSkin.height = 100;
  nameSkin.value = randomSkin.displayName;
};

document.addEventListener("DOMContentLoaded", populateWeapon);

buttonForm.addEventListener("click", randomSkin);
