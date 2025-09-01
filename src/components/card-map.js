import SizeAndScale from "./Gallery-cards/SizeAndScale.astro";
import Fidelity from './Gallery-cards/Fidelity.astro';
import Vespertine from './Gallery-cards/Vespertine.astro';
import DeliberateAI from './Gallery-cards/DeliberateAI.astro';
import CriticalImages from "./Gallery-cards/CriticalImages.astro";
import ImaginePublicTransit from "./Gallery-cards/ImaginePublicTransit.astro";
import Nothing from "./Gallery-cards/Nothing.astro";
import WitnessingGlaciers from "./Gallery-cards/WitnessingGlaciers.astro";
import ScaleWorlds from "./Gallery-cards/ScaleWorlds.astro";
import TerraFirma from "./Gallery-cards/TerraFirma.astro";
import PossibleInternet from "./Gallery-cards/PossibleInternet.astro";
import NPCA from "./Gallery-cards/NPCA.astro";
import Greenways from "./Gallery-cards/Greenways.astro";
import FriendsOfTanzania from "./Gallery-cards/FriendsOfTanzania.astro";
import FidelitySDR from "./Gallery-cards/Fidelity-SDR.astro";


export default [
  { Component: Greenways, typeClass: "branding wordpress ux development" },
  { Component: SizeAndScale, typeClass: "branding website ux development" },
  { Component: FriendsOfTanzania, typeClass: "wordpress website ux" },
  { Component: Fidelity, typeClass: "website ux research" },
  { Component: WitnessingGlaciers, typeClass: "website branding development" },
  { Component: DeliberateAI, typeClass: "website userExperience" },
  { Component: NPCA, typeClass: "website" },
  { Component: PossibleInternet, typeClass: "userExperience" },
  { Component: Vespertine, typeClass: "branding website branding" },
  { Component: ScaleWorlds, typeClass: "userExperience" },
  { Component: TerraFirma, typeClass: "branding website branding" },
  { Component: ImaginePublicTransit, typeClass: "branding" },
  { Component: CriticalImages, typeClass: "branding" },
  { Component: Nothing, typeClass: "userExperience" },
];