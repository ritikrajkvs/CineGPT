@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  background-color: #141414;
  color: white;
  overflow-x: hidden;
}

/* Hide scrollbar for consistent UI */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
