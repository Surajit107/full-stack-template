import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface SidebarState {
  collapsed: boolean;
  hidden: boolean;
  toggleCollapsed: () => void;
  toggleHidden: () => void;
  setCollapsed: (collapsed: boolean) => void;
  setHidden: (hidden: boolean) => void;
  reset: () => void;
}

const initialState = {
  collapsed: false,
  hidden: false,
};

export const useSidebarStore = create<SidebarState>()(
  devtools(
    (set, get) => ({
      ...initialState,

      toggleCollapsed: () => {
        set(state => ({ collapsed: !state.collapsed }));
      },

      toggleHidden: () => {
        set(state => ({ hidden: !state.hidden }));
      },

      setCollapsed: (collapsed: boolean) => {
        set({ collapsed });
      },

      setHidden: (hidden: boolean) => {
        set({ hidden });
      },

      reset: () => {
        set(initialState);
      },
    }),
    {
      name: 'sidebar-store',
    }
  )
);