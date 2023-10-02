---
import CardLabel from "./Card-label.astro";

interface Props {
  size: string;
  href: string;
  title: string;
  types: string[];
  year: string;
}

const { size, href = "#", title, types, year } = Astro.props;
---

<div
  class={size === "small"
    ? " bg-white group w-full relative transition-all ease-in-out hover:cursor-pointer"
    : " bg-white group w-full md:col-span-2 md:row-span-2 relative transition-all ease-in-out hover:cursor-pointer"}
>
  <a href={href} class="">
    <div class="pt-2 px-2 flex flex-col justify-center content-center min-h-full group-hover:min-h-0 transition-all ease-in-out">
      <slot class="max-w-none group-hover:max-w-1/2" />
    </div>
    <div class="border-t px-2 translate-y-12 display-none group-hover:display-block group-hover:translate-y-0 scale-0 group-hover:scale-100">
      <div class="text-center pb-6">
        <CardLabel value={title} , isLarge={true} />
      </div>
      <div class="flex justify-between">
        <div class="flex flex-wrap gap-2">
          {
            types.map((type) => (
            <CardLabel value={type} , isLarge={false} />
            ))
          }
        </div>
        <div class="">
          <CardLabel value={year} , isLarge={false} />
        </div>
      </div>
    </div>
  </a>
</div>

<style>
  img {
    width: 100%;
  }
</style>
