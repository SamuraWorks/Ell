# 💖 Anniversary Section Documentation

A mobile-first romantic anniversary webpage that serves as a memory archive and emotional reflection of love over time.

## 🌙 Overview

The anniversary section is designed as a reflective journey through a shared relationship:

1. **Landing Screen** - Immersive hero with CTA button
2. **Countdown Card** - Shows time remaining or anniversary message
3. **Emotional Anchor** - Poetic reflection to set the tone
4. **Anniversary Letter** - Main emotional content with paragraphs
5. **Memory Wall** - Milestone moments with captions
6. **Journey Timeline** - Growth and challenges timeline
7. **Music Control** - Button to play background music
8. **Private Love Message** - Revealable intimate message
9. **Reflection Message** - Centered reflection on shared growth
10. **Final Line** - Closing statement

## 📁 File Structure

```
/app/anniversary/
  page.tsx                        # Main page component

/components/
  anniversary-hero.tsx            # Full-screen opening
  anniversary-countdown-card.tsx  # Countdown or celebration message
  anniversary-letter.tsx          # Multi-paragraph love letter
  anniversary-timeline.tsx        # Journey timeline
  memory-wall.tsx                 # Milestone memories
  private-love-message.tsx        # Revealable message
  anniversary-closing.tsx         # Reflection and closing lines

/data/
  anniversary.json                # All content data
```

## 🎨 Design Differences from Birthday

### Anniversary-Specific Design
- **Colors**: Darker, warmer tones with burgundy accents
- **Animations**: Slower, more reflective motion (memory-breath vs heart-pulse)
- **Pacing**: Longer delays between elements for contemplation
- **Focus**: Depth, survival, growth, and quiet love rather than celebration
- **Typography**: Elegant serif for titles, clean sans-serif for body (same fonts)

### Color Palette
- **Background**: `from-slate-950 via-red-950/10 to-slate-950` (warmer than birthday)
- **Accents**: Gold and soft burgundy (warmer than pure pink)
- **Borders**: `border-gold-soft/20` (more subtle than birthday)
- **Hover States**: Gentle glow with burgundy undertones

## 🔧 Customization

### Change Content
Edit `/data/anniversary.json`:
- Update hero text
- Modify letter paragraphs
- Add/remove memory wall items
- Update timeline events

### Change Anniversary Date
Update `anniversaryDate` in `anniversary.json` to change the countdown target.

### Styling
All components use Tailwind CSS with custom color tokens:
- `bg-gold`, `text-gold` - Primary accent
- `text-white/90` - Body text (slightly more opaque than birthday)
- `border-gold-soft/20` - Subtle borders

## 📱 Mobile Optimization

- Full responsive design (sm, md breakpoints)
- Touch-friendly buttons with subtle hover states
- Optimized typography sizes
- Smooth scroll behavior
- Slow, intentional animations

## ✨ Key Features

1. **Scroll-triggered reveals** - Content fades in as you scroll
2. **Memory breathing** - Subtle scale animation for nostalgic feel
3. **Slow-pulse effects** - Background glow is 12s cycle vs 8s on birthday
4. **Personal touches** - Custom names and terms of endearment
5. **Reflective depth** - Focuses on growth and survival rather than celebration
6. **Minimal UI** - Maximum emotional impact through simplicity
7. **Accessible** - ARIA labels, semantic HTML

## 🎵 Music Setup

The `MusicControl` component is ready for audio integration:

```typescript
// Recommended: Soft piano + nostalgic strings (slower than birthday)
// BPM: ~60-70 (slower and more meditative)
// Duration: 3-4 minutes for the full scroll experience
```

## 🚀 Access the Page

Navigate to `/anniversary` route:
```
http://localhost:3000/anniversary
```

## 📝 Key Differences from Birthday Section

| Aspect | Birthday | Anniversary |
|--------|----------|-------------|
| **Animation Speed** | 0.8s fade, 1.5s pulse | 2.5s memory-breath |
| **Background Animation** | 8s pulse | 12s slow-pulse |
| **Emotional Tone** | Celebration & surprise | Reflection & growth |
| **Color Warmth** | Pink-focused | Burgundy-focused |
| **Letter Theme** | Individual appreciation | Shared journey |
| **Key Section** | Countdown to birthday | Memory wall & timeline |
| **Scroll Delays** | 100ms between items | 120ms (slower pacing) |

## 💡 Content Philosophy

**Birthday** = "You are special today"
**Anniversary** = "We survived, grew, and became something real together"

The key is that Anniversary is not about celebration—it's about **acknowledgment of a shared journey**.
