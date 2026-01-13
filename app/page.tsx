'use client'

import { Input } from "./components/Input";

export default function Home() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <div>display</div>

      <Input
        label="monteiro"
        handleInput={() => false}
      />
    </div>
  );
}
