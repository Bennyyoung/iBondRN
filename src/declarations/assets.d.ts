


// custom.d.ts
declare module '*.png' {
  const content: number;
  export default content;
}

declare module '*.svg' {
  import React from 'react';
  import { SVGProps } from 'react';

  const content: React.FC<SVGProps<SVGSVGElement>>;
  export default content;
}
