import Image from "next/image";

import { Client } from './Client';
import { ClientOnly } from './ClientOnly';

export default function Home() {
  return (
  <ClientOnly>
   <Client/>
  </ClientOnly>
  );
}
