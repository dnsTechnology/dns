// Animation variants for Framer Motion
export const fadeIn = (direction, delay = 0, duration = 0.9) => {
  return {
    hidden: {
      y: direction === "up" ? 60 : direction === "down" ? -60 : 0,
      x: direction === "left" ? 60 : direction === "right" ? -60 : 0,
      opacity: 0,
    },
    show: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        type: "tween",
        duration: duration,
        delay: delay,
        ease: "easeOut",
      },
    },
  }
}

export const slideIn = (direction, delay = 0, duration = 0.8) => {
  return {
    hidden: {
      x: direction === "left" ? -100 : direction === "right" ? 100 : 0,
      y: direction === "up" ? 100 : direction === "down" ? -100 : 0,
      opacity: 0,
    },
    show: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        type: "tween",
        delay,
        duration,
        ease: "easeOut",
      },
    },
  }
}

export const fadeUp = (delay = 0, duration = 0.8) => {
  return {
    hidden: {
      opacity: 0,
      y: 60,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        delay,
        duration,
        ease: "easeOut",
      },
    },
  }
}

export const zoomIn = (delay = 0, duration = 0.8) => {
  return {
    hidden: {
      scale: 0.8,
      opacity: 0,
    },
    show: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay,
        duration,
      },
    },
  }
}

export const flip = (delay = 0, duration = 0.8) => {
  return {
    hidden: {
      rotateY: 90,
      opacity: 0,
    },
    show: {
      rotateY: 0,
      opacity: 1,
      transition: {
        delay,
        duration,
        ease: "easeOut",
      },
    },
  }
}

export const staggerContainer = (staggerChildren = 0.1, delayChildren = 0) => {
  return {
    hidden: {},
    show: {
      transition: {
        staggerChildren,
        delayChildren,
      },
    },
  }
}

export const scaleIn = (delay = 0, duration = 0.6) => {
  return {
    hidden: {
      scale: 0,
      opacity: 0,
    },
    show: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        delay,
        duration,
      },
    },
  }
}

export const rotateIn = (delay = 0, duration = 0.8) => {
  return {
    hidden: {
      rotate: -180,
      opacity: 0,
    },
    show: {
      rotate: 0,
      opacity: 1,
      transition: {
        delay,
        duration,
        ease: "easeOut",
      },
    },
  }
}

export const bounceIn = (delay = 0) => {
  return {
    hidden: {
      scale: 0.3,
      opacity: 0,
    },
    show: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10,
        delay,
      },
    },
  }
}

export const slideUp = (delay = 0, duration = 0.8) => {
  return {
    hidden: {
      y: 100,
      opacity: 0,
    },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        delay,
        duration,
        ease: "easeOut",
      },
    },
  }
}
