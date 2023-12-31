const APPEARANCE_KEY = 'mode';

const classList = document.documentElement.classList;

const root = document.documentElement;

const setClassList = (isDark = false) => {
  if (isDark) {
    classList.add('dark');
  } else {
    classList.remove('dark');
  }
};

const updateMode = () => {
  const userPreference = localStorage.getItem(APPEARANCE_KEY);
  setClassList(userPreference === 'dark');
};

if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
  updateMode();
  window.addEventListener('storage', updateMode);
}

export async function toggle(event: MouseEvent) {
  root.style.setProperty('--x', `${event.clientX}px`);
  root.style.setProperty('--y', `${event.clientY}px`);

  viewTransition(() => {
    if (classList.contains('dark')) {
      setClassList(false);
      // 本地状态存储
      localStorage.setItem(APPEARANCE_KEY, 'light');
    } else {
      setClassList(true);
      // 本地状态存储
      localStorage.setItem(APPEARANCE_KEY, 'dark');
    }
  });
}

function viewTransition(fn: () => void) {
  if (document.startViewTransition) {
    document.startViewTransition(() => fn());
  } else {
    fn();
  }
}
