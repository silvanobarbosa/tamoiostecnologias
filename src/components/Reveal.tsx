import { motion, type Variants, type HTMLMotionProps } from "framer-motion";
import { forwardRef } from "react";

const baseVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

type RevealProps = HTMLMotionProps<"div"> & {
  delay?: number;
  y?: number;
};

/**
 * Apple-like reveal: fades + rises slightly when entering viewport.
 * Use sparingly — wrap headlines, hero columns, cards.
 */
export const Reveal = forwardRef<HTMLDivElement, RevealProps>(
  ({ children, delay = 0, y = 24, ...props }, ref) => {
    const variants: Variants = {
      hidden: { opacity: 0, y },
      show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
      },
    };
    return (
      <motion.div
        ref={ref}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={variants}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);
Reveal.displayName = "Reveal";

/**
 * Stagger container — direct children using <RevealItem /> animate in sequence.
 */
export const RevealGroup = forwardRef<HTMLDivElement, HTMLMotionProps<"div"> & { stagger?: number }>(
  ({ children, stagger = 0.12, ...props }, ref) => {
    const container: Variants = {
      hidden: {},
      show: { transition: { staggerChildren: stagger, delayChildren: 0.05 } },
    };
    return (
      <motion.div
        ref={ref}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        variants={container}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);
RevealGroup.displayName = "RevealGroup";

export const RevealItem = forwardRef<HTMLDivElement, HTMLMotionProps<"div">>(
  ({ children, ...props }, ref) => (
    <motion.div ref={ref} variants={baseVariants} {...props}>
      {children}
    </motion.div>
  )
);
RevealItem.displayName = "RevealItem";
