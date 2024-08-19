function handleClick(buttonId) {
    localStorage.setItem('selectedButton', buttonId);

    if (buttonId === 'choose1') {
        window.location.href = "index.html";
    } else if (buttonId === 'choose2') {
        window.location.href = "test.html";
    } else if (buttonId === 'choose3') {
        window.location.href = "up.html";
    } else if (buttonId === 'choose4') {
        window.location.href = "set.html";
    } else if (buttonId === 'choose5') {
        window.location.href = "lvl.html";
    }
}

function loadSelectedButton() {
    const selectedButton = localStorage.getItem('selectedButton');
    if (selectedButton) {
        document.getElementById(selectedButton).checked = true;
    }
}
if (window.location.pathname.includes("index.html")) {
    console.log("Находимся на главной странице");
} else if (window.location.pathname.includes("test.html")) {
    console.log("Находимся на тестовой странице");
}

window.onload = loadSelectedButton;