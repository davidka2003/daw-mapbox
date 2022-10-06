import { Variants } from "framer-motion";
export const variantsWithDelay = (delay: number) => {
  return {
    init: {
      x: "-100vw",
      opacity: 0,
    },
    static: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.75,
        delay,
      },
    },
  } as Variants;
};
