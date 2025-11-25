# Refactoring Roadmap - Phase 2
**Status:** In Progress 🚧  
**Goal:** Make codebase indistinguishable from expert human-written code

---

## Phase 2 Strategy: LegacyHero.tsx Cleanup

### Current State Analysis
**File:** `LegacyHero.tsx`  
**Size:** 1,233 lines, 42KB  
**Issues:**
- ❌ Misleading name ("Legacy" implies deprecated code)
- ❌ Massive component with multiple responsibilities
- ❌ Contains UI components that should be separate files
- ❌ Camera logic mixed with business logic
- ❌ Uses `@ts-nocheck` (type safety disabled)

---

## Recommended Refactoring Steps

### **Step 1: Extract UI Components** 🎯
Move these standalone components to their own files:

```
components/home/ui/
├── ServiceItem.tsx         (lines 305-338)
├── Sidebar.tsx             (lines 340-439)
├── InfoCard.tsx            (lines 443-535)
├── BookingModal.tsx        (lines 538-580)
├── ServiceDock.tsx         (lines 582-671)
├── AddOnBar.tsx            (lines 673-727)
└── index.ts
```

**Benefits:**
- Each component can be tested independently
- Easier to understand and modify
- Better code reusability
- Reduces main file by ~400 lines

---

### **Step 2: Extract Camera System** 🎯
Create dedicated camera module:

```
components/home/3d/camera/
├── CameraRig.tsx           (lines 83-284)
├── useCameraControl.ts     (custom hook for camera state)
└── index.ts
```

**Benefits:**
- Clean separation of 3D camera logic
- Reusable for other 3D scenes
- Reduces main file by ~200 lines

---

### **Step 3: Extract Custom Hooks** 🎯
Create hooks for state management:

```
components/home/hooks/
├── useMobile.ts           (lines 61-75 - already a function!)
├── useCleaningState.ts    (cleaning state machine logic)
├── useServiceState.ts     (active service/addon/view state)
├── useInfoCard.ts         (info card visibility logic)
└── index.ts
```

**Benefits:**
- Testable business logic
- Clearer state management
- Reduces main file by ~100 lines

---

### **Step 4: Extract Constants & Types** 🎯
Create dedicated config files:

```
components/home/config/
├── constants.ts           (MENU_ITEMS, LOCATION_COPY, styles)
├── types.ts               (TypeScript interfaces)
└── index.ts
```

**Benefits:**
- Single source of truth for config
- Easier to modify without touching components
- Reduces main file by ~100 lines

---

### **Step 5: Rename & Reorganize** 🎯
Final cleanup:

```
Before: LegacyHero.tsx (1,233 lines)
After:  InteractiveHeroScene.tsx (~300 lines)
```

This becomes the orchestrator that:
- Uses extracted hooks for state
- Renders Canvas with CameraRig
- Renders UI components (Sidebar, ServiceDock, etc.)
- Coordinates between 3D scene and UI

---

## Expected Final Structure

```
components/home/
├── InteractiveHeroScene.tsx    (~300 lines - main orchestrator)
├── 3d/
│   ├── CarModel.tsx
│   ├── ModelDebugger.tsx
│   ├── camera/
│   │   ├── CameraRig.tsx
│   │   ├── useCameraControl.ts
│   │   └── index.ts
│   └── hooks/ (existing)
├── effects/ (existing - 13 files)
├── ui/
│   ├── ServiceItem.tsx
│   ├── Sidebar.tsx
│   ├── InfoCard.tsx
│   ├── BookingModal.tsx
│   ├── ServiceDock.tsx
│   ├── AddOnBar.tsx
│   └── index.ts
├── hooks/
│   ├── useMobile.ts
│   ├── useCleaningState.ts
│   ├── useServiceState.ts
│   ├── useInfoCard.ts
│   └── index.ts
└── config/
    ├── constants.ts
    ├── types.ts
    └── index.ts
```

---

## Estimated Impact

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| Largest file | 1,233 lines | ~300 lines | **-76%** |
| Component files | 1 | 7 UI components | +600% |
| Hooks | 1 inline | 4 custom hooks | +300% |
| Testability | Low | High | ✅ |
| Maintainability | Medium | Excellent | ✅ |

---

## Phase 3 (Future)

After LegacyHero cleanup:
1. **Add TypeScript types** - Remove all `@ts-nocheck`
2. **Add JSDoc comments** - Document all public APIs
3. **Performance optimization** - Memoization, lazy loading
4. **Unit tests** - Test hooks and components
5. **Storybook** - Visual component documentation

---

## Recommendation

**Start with Step 1** (Extract UI Components) because:
- ✅ Lowest risk (just moving files)
- ✅ Immediate visible improvement
- ✅ Allows parallel work on other steps
- ✅ Each component is self-contained

Would you like me to proceed with this plan?
