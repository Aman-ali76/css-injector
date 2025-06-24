# 🎨 CSS Injector Site-Specific

<div align="center">

[![Chrome Web Store](https://img.shields.io/badge/Chrome-Web%20Store-blue?style=for-the-badge&logo=google-chrome)](https://chrome.google.com/webstore) [![Version](https://img.shields.io/badge/version-1.6.12-green?style=for-the-badge)](https://github.com/Aman-ali76/css-injector)  [![License](https://img.shields.io/badge/license-MIT-orange?style=for-the-badge)](LICENSE)  [![Made with ❤️](https://img.shields.io/badge/Made%20with-❤️-red?style=for-the-badge)](https://ragalreach.com)

</div>

> 🚀 **Transform any website with your custom CSS magic!** ✨

## 📖 Introduction

Welcome to **CSS Injector Site-Specific** - the ultimate browser extension that empowers you to customize any website's appearance with your own CSS styles! 🎭

### ✨ Amazing Features

- 🎯 **Site-Specific Styling**: Apply unique CSS to individual websites
- 🔍 **Element Inspector**: Built-in tool to identify classes and IDs with ease
- 💾 **Auto-Save Magic**: Your changes are automatically saved as you type
- ⚡ **Real-Time Preview**: See your changes instantly without page refresh
- 🎨 **Smart Code Editor**: Auto-completion, syntax highlighting, and more
- 📋 **One-Click Copy**: Copy element selectors with `Ctrl + Shift + C`
- 🔄 **Easy Reset**: Remove all custom styles with a single click

### 🌟 Why Choose CSS Injector?

- **No Coding Required**: Simple and intuitive interface for everyone
- **Privacy First**: All data stored locally on your device
- **Lightning Fast**: Minimal performance impact on browsing
- **Cross-Site Compatible**: Works on virtually any website
- **Developer Friendly**: Perfect for web developers and designers

---

## 📁 File Structure Overview

\```
css-injector-extension/
├── 📄 manifest.json          # Extension configuration and permissions
├── 🎨 popup.html            # Main popup interface
├── ⚙️ popup.js              # Popup functionality and auto-save logic
├── 🔍 inspect.js            # Element inspection and highlighting
├── 🌐 content.js            # Content script for CSS injection
├── 🔧 background.js         # Service worker for extension management
├── 🎭 inspect.css           # Styling for inspection mode
├── 🖼️ image/                # Extension icons and assets
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
└── 📚 README.md             # You are here! 👋
\```

### 🔧 Core Components

| File | Purpose | Key Features |
|------|---------|--------------|
| `popup.html` | 🎨 Main Interface | Clean UI with textarea and controls |
| `popup.js` | ⚡ Core Logic | Auto-save, syntax helpers, shortcuts |
| `inspect.js` | 🔍 Inspector Tool | Element highlighting and selector copying |
| `content.js` | 🌐 CSS Injection | Applies styles to target websites |
| `background.js` | 🔧 Service Worker | Manages popup reopening and messaging |

---

## 🚀 Future Development Plans

### 🎯 Version 2.0 Roadmap

- [ ] 🌙 **Dark Mode Support**: Toggle between light and dark themes
- [ ] 🎨 **CSS Templates**: Pre-built templates for common customizations
- [ ] 📊 **Usage Analytics**: Track your most customized sites
- [ ] 🔄 **Import/Export**: Backup and share your CSS configurations
- [ ] 🎭 **Advanced Inspector**: CSS property suggestions and live editing
- [ ] 🔗 **CSS Preprocessor**: SASS/LESS support for advanced users

### 🎨 Upcoming Features

- **Visual CSS Builder**: Drag-and-drop interface for non-coders
- **Community Sharing**: Share and discover CSS snippets
- **Version Control**: Track changes and revert to previous versions
- **Performance Monitor**: Analyze CSS impact on page load times
- **Collaboration Tools**: Team-based CSS management

---

## ⚠️ Disclaimer

### 🛡️ Important Notice

This extension is provided "as is" without warranty of any kind. While we strive to ensure compatibility and safety:

- 🔒 **Use Responsibly**: Only inject CSS on websites you own or have permission to modify
- 🌐 **Website Compatibility**: Some websites may have security measures that prevent CSS injection
- 📱 **Browser Support**: Designed for Chromium-based browsers (Chrome, Edge, Brave, etc.)
- 🔄 **Updates**: Website changes may affect your custom styles
- 💾 **Data Loss**: Always backup important CSS configurations

### 🚨 Security Considerations

- Never inject malicious code or scripts
- Be cautious when copying CSS from untrusted sources
- Some websites may detect and block custom styling
- Extension permissions are minimal and focused on functionality

---

## 🔐 Privacy Policy

### 📊 Data Collection & Storage

**We respect your privacy!** Here's what you need to know:

#### ✅ What We DON'T Collect
- 🚫 Personal information or browsing history
- 🚫 Website content or user interactions
- 🚫 Analytics or tracking data
- 🚫 Passwords or sensitive information

#### 💾 What We Store Locally
- 🎨 Your custom CSS code for each website
- ⚙️ Extension preferences and settings
- 🌐 Website hostnames (for CSS association only)

#### 🔒 Data Security
- All data is stored locally in your browser
- No data is transmitted to external servers
- You have full control over your data
- Uninstalling the extension removes all stored data

#### 🌐 Permissions Explained
- **activeTab**: Apply CSS to the current website
- **storage**: Save your custom CSS locally
- **scripting**: Inject CSS into web pages
- **clipboardWrite**: Copy element selectors to clipboard

### 🛡️ Your Rights
- **Full Control**: Modify or delete your data anytime
- **Transparency**: Open-source code available for review
- **No Tracking**: Zero telemetry or user tracking
- **Local First**: All processing happens on your device

---

## 👨‍💻 About the Author

**Aman Ali**

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. 🍴 Fork the repository
2. 🌿 Create a feature branch
3. 💻 Make your changes
4. 🧪 Test thoroughly
5. 📝 Submit a pull request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---


<div align="center">

### 🌟 Star this project if you find it useful! 🌟

**Made with ❤️ by Aman Ali**

*Empowering users to make the web their own, one CSS rule at a time!* ✨

</div>