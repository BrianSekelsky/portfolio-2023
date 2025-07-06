import SizeAndScale from "./Gallery-cards/SizeAndScale.astro";
import Fidelity from './Gallery-cards/Fidelity.astro';
import Vespertine from './Gallery-cards/Vespertine.astro';
import DeliberateAI from './Gallery-cards/DeliberateAI.astro';
import Fidelity from "./Gallery-cards/Fidelity.astro";
import SizeAndScale from "./Gallery-cards/SizeAndScale.astro";
import CriticalImages from "./Gallery-cards/CriticalImages.astro";
import Vespertine from "./Gallery-cards/Vespertine.astro";
import ImaginePublicTransit from "./Gallery-cards/ImaginePublicTransit.astro";
import Nothing from "./Gallery-cards/Nothing.astro";
import WitnessingGlaciers from "./Gallery-cards/WitnessingGlaciers.astro";
import ScaleWorlds from "./Gallery-cards/ScaleWorlds.astro";
import DeliberateAI from "./Gallery-cards/DeliberateAI.astro";
import TerraFirma from "./Gallery-cards/TerraFirma.astro";
import PossibleInternet from "./Gallery-cards/PossibleInternet.astro";
import LAS from "./Gallery-cards/LAS.astro";
import NPCA from "./Gallery-cards/NPCA.astro";


export default [
  { Component: SizeAndScale, typeClass: "branding website ux caseStudy" },
  { Component: Fidelity, typeClass: "website ux research caseStudy" },
  { Component: CriticalImages, typeClass: "branding" },
  { Component: DeliberateAI, typeClass: "website ux" },
  { Component: ImaginePublicTransit, typeClass: "branding" },
  { Component: WitnessingGlaciers, typeClass: "website branding caseStudy" },
  { Component: PossibleInternet, typeClass: "userExperience caseStudy" },
  { Component: Vespertine, typeClass: "branding website branding" },
  { Component: TerraFirma, typeClass: "branding website branding" },
  { Component: ScaleWorlds, typeClass: "userExperience caseStudy" },
  { Component: LAS, typeClass: "userExperience caseStudy" },
  { Component: Nothing, typeClass: "userExperience" },
  { Component: NPCA, typeClass: "website" },
  { Component: DeliberateAI, typeClass: "website userExperience" },
];