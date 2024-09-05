const imageIconPack = {
  eyeClosed: require('@/assets/images/eye-closed.png'),
  eyeOpen: require('@/assets/images/eye-opened.png'),
};

export { imageIconPack };

export type ImageIconPackType = keyof typeof imageIconPack;
