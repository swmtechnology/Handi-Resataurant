/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Dish, DeliveryAddress } from "./types";

export const DISHES: Dish[] = [
  {
    id: "biryani-1",
    name: "Authentic Handi Biryani",
    description: "Slow-cooked to perfection over a low wood fire. Our signature heritage recipe uses long-grain basmati rice, tender marinated vegetables, and a secret blend of 21 whole spices, sealed with dough to trap the rich, aromatic steam.",
    price: 450,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBlhI9XR7-Nm-rUM3lSXt75v2taTNGmo5nnCd2PtNZf3ZOxG3_TWb2xkMkHMm_0pxemuavyYo3Wcbx8ZsXBj1CpyYk9ZM_AX603JoDQCtHCXIk-pFIskIh0IfGHkGoA74oZVPwpKOAXNpJ3DmwhIAx1CYZ9p-FMCRNYFiizsK0qOvl5z0C480p7UCCNfTbfU0Vjd754cbMLFMrAclqIQtoghLKMOjlAs-51iq5bdZiCIyzS8sYdgFUgTvUapPAH-WIfa2CLLo6WPXc",
    rating: 4.8,
    ratingCount: "1.2k Ratings",
    time: "45-50 mins",
    isVeg: true,
    category: "Biryani",
    dietaryTags: ["Gluten-Free", "Contains Dairy", "Medium Spicy"]
  },
  {
    id: "chicken-lazeez",
    name: "Murgh Handi Lazeez",
    description: "Slow-cooked chicken in a rich, aromatic gravy infused with signature Handi spices.",
    price: 340,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDXtEIBbaYy_MIfR-WszOlWrv5ttbhWIiM0rQ7n2DShz6oR5BIo-JXPNHBzmF2NPQTbvP87h9PUMPFy7VEujPKjAfYQiSA99LAhNfuisX0lN9NWAWAAyHBy3oMRtVAMDZo_H1zHqq-oEt8KFzCVLIYkaQ57TG99bUf2NGdjAUyApNMY31BMOZZLXFJ2aaXsbfIWrG_kYJpbw_M_S5_7J53qDnvZxt6LoBNu2-rXaX_-ayIG39Hmu7gSMhEPfauWUmoYG0P3LAZxlbI",
    rating: 4.8,
    isVeg: false,
    category: "Handi Specials"
  },
  {
    id: "paneer-khas",
    name: "Paneer Handi Khas",
    description: "Soft cottage cheese cubes in a creamy tomato-onion base, finished with fresh cream.",
    price: 280,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDrNOLOwYv4gVbbTTtZY2lElHTe_lAj07G_ypiMjfALNMB1802kX18sO3-YHAyoOQhQZk8t1Pw8SqTmyvdF2-TfPh3roAJYXnFDAnBbUQk5fFMC_YQOwIXJksv8P4F0HErj2u9jQ41tIW5-MaCsKKJk_W7E04PBJhvvZbVvqm_2QfA3OR4afc2fqSoV4XuPvbzsldnaKUGdGCvmKhylIgEG8AeLlVbzlbTxU86lj1D-I1mwxlkcrjq5ZLl8JJEXDy7wAGvMGKGZc04",
    rating: 4.5,
    isVeg: true,
    category: "Handi Specials"
  },
  {
    id: "chicken-tikka",
    name: "Chicken Tikka Masala Handi",
    description: "Our signature slow-cooked chicken in a rich, aromatic tomato and onion gravy, prepared traditionally in an earthen pot to seal in the flavors.",
    price: 450,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCZabEV1VmM82EDUX1PHzcd1k8g9WVCypYOec5jMHMawCAwQ9j83QkXBKhFb7bpkE4JMpiEbLVUMlOQpPMGD0Ww5UnfNxCLJS7vRlaJU5qXeap3gSeoJ5R_iKGyHxAzpM61qdwAQ0oOXdIkqTse8OMBr_loF2kHAKlOZcp1VeP5csd7LJR0_klxwkhHihIbm837ADD-4oUbh5txWWscreoTFlmQF4YMLm6AMkYsFCZ4eb3C59Tfxj8-D1bORv3CCFdCsPFqRt9w5Yk",
    rating: 4.9,
    isVeg: false,
    category: "Handi Specials"
  },
  {
    id: "paneer-tikka",
    name: "Handi Paneer Tikka",
    description: "Soft cottage cheese cubes simmered in a luscious, creamy cashew and tomato sauce, infused with whole Indian spices.",
    price: 380,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA2g92EKvHnNLiCBSTkntl0gPBK4MfEg80dfKiEBlPTgJQPrjvGObSRHCOSCNP8GhbaXnvgVG5b0HiQtoz1DtBDquvpIzPoWCWL4VtdLpb9F1e54wHELd8al0bYrcdinft0kx__XAY6rhSSbahDh5hU8GqB3GSvmFX-aadiqUtKkzXG9fXZBYlp3HpN3FtYR0cCAJrmTg-HWsmLbiMGSiTjSsDXgMQkue0_pRGRWChbcJ3Bv1FRDET2bhEg2uWYqo0Va_K775lGHfo",
    rating: 4.7,
    isVeg: true,
    category: "Handi Specials"
  },
  {
    id: "mutton-rogan",
    name: "Mutton Rogan Josh",
    description: "A classic Kashmiri delicacy. Tender mutton pieces slow-cooked with a blend of warming spices, Kashmiri red chilies, and yogurt, delivering a robust and deeply flavorful curry. Perfect with garlic naan.",
    price: 650,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDvwoNYJxyE0WBHD3h_BKweXgJzAwqgd0G-b78J63_o700yo6s3MCewxH8wgoxdJYeIBs8QT0gI0hWYAJIu4so4fJwCo-P7aX7Ye4n9YrYYL1Lb30ZgoiB6-btsrlE1PgISl8IJwUX6xkZr_88FE6pmiqjFrHS_Xobj7KrOHEDtbG1jfT8IzYv78lGgSItd83nyfdEp-mgdcuRkN4Ddv74M2971dyMPMgSloI-dwCqjVOt_sTWK2oDNh3czZtnv13zS1uubSrWZor0",
    rating: 4.9,
    isVeg: false,
    category: "Handi Specials",
    sizes: ["Quarter", "Half", "Full"],
    sizePrices: { "Quarter": 350, "Half": 650, "Full": 1200 }
  },
  {
    id: "mutton-dum-biryani",
    name: "Mutton Dum Biryani",
    description: "Our signature tender marinated mutton cooked with dum basmati rice served with aromatic spices and customized raita.",
    price: 580,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBlhI9XR7-Nm-rUM3lSXt75v2taTNGmo5nnCd2PtNZf3ZOxG3_TWb2xkMkHMm_0pxemuavyYo3Wcbx8ZsXBj1CpyYk9ZM_AX603JoDQCtHCXIk-pFIskIh0IfGHkGoA74oZVPwpKOAXNpJ3DmwhIAx1CYZ9p-FMCRNYFiizsK0qOvl5z0C480p7UCCNfTbfU0Vjd754cbMLFMrAclqIQtoghLKMOjlAs-51iq5bdZiCIyzS8sYdgFUgTvUapPAH-WIfa2CLLo6WPXc",
    rating: 4.8,
    isVeg: false,
    category: "Biryani"
  },
  {
    id: "soup-veg",
    name: "Veg Manchow Soup",
    description: "Classic Indo-Chinese sour and spicy soup cooked with mixed vegetables, garlic, ginger, and crispy fried noodles.",
    price: 150,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDOgjQ5DyQaFi8I5Yxmzo-d85LSuT5wu2gNzEvAkCADDgGqjdytqaOpzJoWG-0GtkYc2JOPe_xDhMcGt9R82EV4ng6uhkxH982KguW8XesVo7o0Bu1rZi-WA4ksUMDMLMViuZHmC_SrtdhklFfDb41ogwItHA8ZbkSFlUUOPBuzaoIreWiz2fB3rx0DWX_cy3BO_YfcOcl06Mqzh-V_0HQk2td0SoKECcp0AgMMIITTZpu8utiLPDiN2zferurhJiE5Q669UC8Nqbg",
    rating: 4.4,
    isVeg: true,
    category: "Soups"
  },
  {
    id: "soup-chicken",
    name: "Chicken Sweet Corn",
    description: "Shredded chicken and sweet corn kernels simmered in a rich, buttery broth swirled with egg drop.",
    price: 180,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA1UI0p0hY_8qf_adk0MrkkL8FWVsL5lrAqRi45L8hYEUf40mFh9-sQdTGwCEzQFOPdLUUXJuwUWYwf5_I2VhJ2eTdvJVbWeF1SFWTaLqIU_UX-bpTOjPsrPM3qtHcFusx-VVATEgPOIl7gSAqoyalwmADLrBp5H4kyXRTzRjVaUXUlYyF0q5AcXfGVzqOulT_XpQMFPi8k_YQBbyEjSJXJu-FmxNSoVjN_LyVbO37lKpVm6EMdsvUgugK-8ph_43PEH5Swe8FZEaU",
    rating: 4.6,
    isVeg: false,
    category: "Soups"
  },
  {
    id: "starter-chicken",
    name: "Chilli Chicken (Dry)",
    description: "Spicy Indo-Chinese chicken chunks tossed with diced bell peppers, red onion chunks, and green chilies.",
    price: 320,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB-QNbzh1ybaQ-ycTCblNwWpAWDsXyriVKYCu5vUleqTO1qR3D3EKCY8ZEvky78zS-kZB84S6K6ztoAsN5rDX3n12bWKi5vXUdwHmOuUibKMP3cuyalhLsaJnYnJYSejRJvykwERi45FrkWWce9RV2CeTfjwrC7mkiqJ6ugV6GMdC2lKzUO-p5iAXbDFV2HXnfFNi_dpCnprsoNdYCoZ0h70-eIYoRhgM6HZj5hqHiqOiAQhK-1Tej3h3p5gy-2VdQpfdtCdBxYCtk",
    rating: 4.8,
    isVeg: false,
    category: "Starters & Snacks"
  },
  {
    id: "starter-kebab",
    name: "Hara Bhara Kebab",
    description: "Crispy pan-fried patties filled with fresh organic spinach, green garden peas, and seasoned potatoes.",
    price: 260,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBhv5VKB0S8dGFrLakKW7rQnUF1Fnh9EsQGmNHkI1a1Qu70Ch2Vsxdi-be05R4FlYR8pX3OFEzaMFt381MqS0qJfpqxYabC65frEo_8hwBOK26YIhw3qfdPytsQWu4A-LoMvsGpAYwHcK-S_Wlf53FtU3erqLWaqgoIbaHf2N-TIlF-dsT9csAnaX7AmUi4yNWO9Duq4zjyVmKoI827M167i8S4gNI2QtGawzCt9w51vZuAm-36Aus_5As5peqjMU4FywXI0bmA9ng",
    rating: 4.5,
    isVeg: true,
    category: "Starters & Snacks"
  },
  {
    id: "main-butter-chicken",
    name: "Murgh Makhani (Butter Chicken)",
    description: "Tandoori brick-baked chicken simmered in a smooth, sweet-savory tomato and fresh cream butter gravy.",
    price: 380,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCbd-_ld7e8tbXruOnpzlFKYnE_mkVPYF1yMVtEUqinK6rBgftCVFQVXZ8_e45X8ngWJHSxr3jHPJnAdS_4cdpD_XtNC772-89hGX1S9XrXk4oePyoYmd68zz8_atXEfqFwmRH9lEfz3WehwmjnSnaVZO_SqjB5gDr3Owgx1PtSboTDEwU_QcYPJftLBX1qUqlwi0qqwyhQIcwRQo4xNREkZ1y_UagThMutQ7s23MRSfZPLWTwhiZfZWSU4ely1YHX7FDE-4U0PWks",
    rating: 4.9,
    isVeg: false,
    category: "Main Course",
    sizes: ["Half", "Full"],
    sizePrices: { "Half": 380, "Full": 720 }
  },
  {
    id: "main-kadhai-paneer",
    name: "Kadhai Paneer",
    description: "Cottage cheese squares stir-fried with hot green bell peppers and whole freshly crushed dry coriander.",
    price: 280,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAUBbLfnTLeyWBntBxjsu-QEsP0X2PbLrNxhIO6aWXp2ImlBGnsIElPnNYywVsBfzmTisoNzyk6c91A4qF7dehalJbW0EF4v9oBmao-A1MidBjfD7FhNsXaewUL6CeTabY1_SmSoJICccneHxgihTOXVhje31TdwSgNN0Zg6V6INtTyEDsz5y1wgh3D9qpLwv77XJKTrp3h66Wy5Jf14qt7cbsYACEFRSEzOZ-293NnUoPcB336-4xmRjQaZpFZDSVcBdEe0AHDywg",
    rating: 4.6,
    isVeg: true,
    category: "Main Course",
    sizes: ["Half", "Full"],
    sizePrices: { "Half": 280, "Full": 520 }
  },
  {
    id: "bread-butter",
    name: "Butter Naan",
    description: "Traditional soft tandoor clay oven baked bread layered generously with melted pure butter.",
    price: 60,
    image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&q=80&w=600",
    rating: 4.7,
    isVeg: true,
    category: "Breads"
  },
  {
    id: "bread-garlic",
    name: "Garlic Naan",
    description: "Tandoori bread hand-pressed with minced garlic, fine cilantro leaves, and glazed with clarified butter.",
    price: 80,
    image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&q=80&w=600",
    rating: 4.8,
    isVeg: true,
    category: "Breads"
  }
];

export const CATEGORIES = [
  { id: "all", name: "All", icon: "grid" },
  { id: "biryani", name: "Biryani", icon: "restaurant" },
  { id: "north-indian", name: "North Indian", icon: "tapas" },
  { id: "veg", name: "Veg", icon: "eco", isVegToggle: true },
  { id: "non-veg", name: "Non-Veg", icon: "set_meal", isNonVegToggle: true }
];

export const PRESET_ADDRESSES: DeliveryAddress[] = [
  {
    label: "Home",
    address: "A-45, Connaught Place Inner Circle, Near Regal Cinema, New Delhi, 110001",
    timeEstimation: "35-45 mins"
  },
  {
    label: "Office",
    address: "B-12, Cyber City Pillar 54, Sector 24, Gurugram, Haryana, 122002",
    timeEstimation: "40-50 mins"
  }
];
