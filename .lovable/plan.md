# iOS-on-the-Web Experience

A fully interactive iOS simulator built with React, Vite, Tailwind CSS, and Framer Motion. Features a complete screen flow, swipe gestures, 12+ functional apps, and PWA support.

---

## Phase 1: Foundation & Core System

### iOS Design System

- Custom Tailwind theme with iOS design tokens (SF Pro-like typography via Inter/Poppins, system colors, blur effects, rounded corners)
- Dark/light mode matching iOS appearance
- Status bar component (time, battery, signal indicators)
- Home indicator bar component

### Gesture & Navigation System

- Framer Motion-powered swipe detection (up/down/left/right) with velocity thresholds
- Screen stack navigation via React Context (LockScreen → HomeScreen, swipe-left for Widgets, tap for apps)
- Smooth spring-based screen transitions
- Touch feedback with scale/opacity animations
- `touch-action: none` to prevent browser gesture conflicts

---

## Phase 2: Core Screens

### Lock Screen

- Large time display with real-time clock updating every second
- Date display with proper locale formatting
- Swipe-up-to-unlock gesture with animated indicator
- Flashlight and camera quick-action buttons
- Blurred wallpaper background

### Widget Screen (swipe left from home)

- Grid layout supporting small (2×2), medium (4×2), and large (4×4) widget sizes
- Live Weather widget (using a free weather API for real data)
- Clock widget with real-time updates
- Calendar widget showing today's events
- Battery/fitness-style ring widget

### Home Screen

- 4-column app icon grid with labels
- Multiple pages with swipe-left/right navigation
- Page dots indicator
- Search bar (pull down) for app filtering
- Dock bar at bottom with 4 pinned apps (Phone, Safari, Messages, Music)

---

## Phase 3: Functional Apps (12+)

### Communication Apps

- **Mail**: Inbox list with sender, subject, preview; compose modal; swipe-to-delete; unread badges
- **Messages**: Conversation list with contact avatars; iMessage-style chat bubbles; type and send messages (stored in local storage)
- **FaceTime**: Contact grid with call UI mockup

### Productivity Apps

- **Notes**: Create, edit, delete notes with rich text; local storage persistence; folder organization
- **Calendar**: Month/week/day views; add/edit events; local storage persistence
- **Reminders**: Todo lists with checkboxes; due dates; multiple lists; local storage
- **Calculator**: Fully working iOS-style calculator with standard operations and display

### Utility Apps

- **Weather**: Real weather data from free API (OpenWeatherMap or similar); hourly/daily forecast; location-based
- **Clock**: World clock, alarm list, stopwatch (functional with start/stop/lap), timer (functional countdown)
- **Settings**: Toggleable settings (Wi-Fi, Bluetooth, dark mode, wallpaper selection) stored in local storage
- **Camera**: Device camera access via getUserMedia API; photo capture; saved to Photos app

### Media & Browse Apps

- **Safari**: Address bar with URL input; iframe-based web browsing (where allowed); bookmarks; tab management
- **Photos**: Gallery grid of captured/sample photos; full-screen viewer with pinch-to-zoom; albums

---

## Phase 4: Polish & PWA

### Animations & Micro-interactions

- App launch zoom animation (icon expands to full screen)
- App close animation (shrink back to icon position)
- Long-press app icons for jiggle mode (rearrange/delete)
- Spring-based transitions for all screen changes
- Notification badge bounce animation

### PWA Configuration

- Web app manifest for installability (standalone, portrait, theme color)
- Service worker for offline caching of app shell
- App icons in multiple sizes (192×192, 512×512)
- Splash screen configuration

### Responsive Design

- Mobile-first: iPhone frame centered on larger screens with device bezel mockup
- On actual mobile devices: full-screen experience
- Fluid typography and spacing that adapts to viewport

---

## State Management

- **ScreenContext**: Screen stack, current screen, navigation functions
- **AppContext**: App registry, badges, app-specific state
- **ThemeContext**: Dark/light mode, wallpaper selection
- **Local Storage**: Persistent data for Notes, Messages, Reminders, Calendar, Settings, Photos

Use iOS 26 Liquid Glass effect for the entire app 