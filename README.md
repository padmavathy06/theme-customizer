# theme-customizer

A fully interactive *Theme Customizer Web App* built using *HTML, CSS, and JavaScript*.  
This project allows users to *visually personalize* their website theme in real-time — including color schemes, fonts, card radius, dark/light mode, and more — all with live preview and local storage persistence.

---

## 🚀 Features

- 🌗 *Light & Dark Mode*
- 🎨 *Custom Accent, Background, and Text Colors*
- 🖋 *Font Family and Font Size Adjustment*
- 🧊 *Glass Effect Intensity Control*
- 🧱 *Adjustable Card Border Radius*
- 💾 *Save and Load Theme Preferences (via LocalStorage)*
- 📤 *Export / Import Theme as JSON File*
- ⚡ *Instant Live Preview*

---

## 🧠 Tech Stack

- *HTML5* — structure  
- *CSS3 (Custom Properties & Transitions)* — theme styling  
- *JavaScript (ES6)* — real-time interactivity and persistence  

---

## 📂 Project Structure

theme-customizer/
│
├── index.html # Main HTML page
├── style.css # All styling and theme variables
├── script.js # Core functionality and live customization
└── README.md # Documentation

---

## 💡 How It Works

1. User interacts with the left-side panel to choose colors, font, radius, etc.  
2. JavaScript dynamically updates CSS variables (--bg-color, --accent-color, etc.).  
3. The app saves all custom settings in *localStorage*.  
4. Users can also export their theme as a .json file and import it later.

---

## 🛠 Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/padmavathy06/theme-customizer
2. Open the folder:
   cd theme-customizer
3. Launch the project:
   Simply open index.html in your browser.
   No server required.
