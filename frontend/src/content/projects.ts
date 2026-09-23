export interface LocalizedString {
  sv: string;
  en: string;
}

export interface LocalizedList {
  sv: string[];
  en: string[];
}

export interface ProjectResult {
  title: LocalizedString;
  value: LocalizedString;
  desc: LocalizedString;
}

export interface ProjectItem {
  slug: string;
  title: LocalizedString;
  location: LocalizedString;
  district: string;
  category: string;
  barber: LocalizedString;
  time: LocalizedString;
  year: string;
  image: string;
  gallery: string[];
  excerpt: LocalizedString;
  description: LocalizedString;
  challenge: LocalizedString;
  highlights: LocalizedList;
  results: ProjectResult[];
  seo: {
    title: LocalizedString;
    description: LocalizedString;
  };
}

export const projectCategories: Record<string, LocalizedString> = {
  cut: { sv: 'Klippning & Fade', en: 'Haircut & Fade' },
  beard: { sv: 'Skägg & Rakning', en: 'Beard & Shave' },
  makeover: { sv: 'Helhetsförvandling', en: 'Full Transformation' },
  ritual: { sv: 'Luxury & Ritual', en: 'Luxury & Ritual' },
  modern: { sv: 'Trend & Vardag', en: 'Modern & Lifestyle' }
};

export const projects: ProjectItem[] = [
  {
    slug: 'klassisk-executive-herrklippning-odenplan',
    title: {
      sv: 'Klassisk Executive Herrklippning & Styling',
      en: 'Classic Executive Men’s Haircut & Styling'
    },
    location: {
      sv: 'Odenplan, Vasastan',
      en: 'Odenplan, Vasastan'
    },
    district: 'Odenplan',
    category: 'cut',
    barber: {
      sv: 'Roy',
      en: 'Roy'
    },
    time: {
      sv: '45 min',
      en: '45 mins'
    },
    year: '2026',
    image: '/images/manW-Herrklippning.webp',
    gallery: [
      '/images/salon-work.webp',
      '/images/hero-craft.webp',
      '/images/salon-chair.webp'
    ],
    excerpt: {
      sv: 'Tidlös herrklippning med knivskarp saxprecision och skräddarsydd styling anpassad för ledande yrkesroller i Stockholm.',
      en: 'Timeless men’s haircut with scissor precision and custom styling tailored for executive professionals in Stockholm.'
    },
    description: {
      sv: 'Kunden sökte en sofistikerad och strukturerad herrklippning med rena konturer och ett naturligt fall som håller formen mellan möten och representation. Vi inledde med en noggrann formkonsultation för att anpassa längd och övergångar efter huvudform och hårvirvlar, följt av skonsam tvätt och skalpmassage.',
      en: 'The client desired a sophisticated, structured cut with clean contours and natural flow that retains its shape across business meetings and events. We began with a consultation taking head shape and growth patterns into account, followed by a wash and scalp massage.'
    },
    challenge: {
      sv: 'Att balansera klassisk elegans med modern lätthet så att frisyren ser oklanderlig ut utan att kräva mer än två minuters styling på morgonen.',
      en: 'Balancing timeless elegance with modern lightness, ensuring the cut looks impeccable while requiring no more than two minutes of daily styling.'
    },
    highlights: {
      sv: [
        'Djupgående form- och hårkonsultation',
        'Saxöverkamning med millimeterprecision runt tinningar och nacke',
        'Schamponering och uppfriskande skalpmassage vid tvättbänken',
        'Avslutande föning och finish med matt vattenbaserad pomada'
      ],
      en: [
        'In-depth style and hair profile consultation',
        'Scissor-over-comb precision around temples and neckline',
        'Shampoo and revitalizing scalp massage at the wash station',
        'Blow-dry finish with premium matte water-based pomade'
      ]
    },
    results: [
      {
        title: { sv: 'Knivskarp finish', en: 'Razor-sharp lines' },
        value: { sv: '100% precision', en: '100% precision' },
        desc: { sv: 'Sömlös silhuett som ramar in ansiktsdragen perfekt.', en: 'Seamless silhouette framing facial features perfectly.' }
      },
      {
        title: { sv: 'Hållbar form', en: 'Lasting structure' },
        value: { sv: '4-6 veckor', en: '4-6 weeks' },
        desc: { sv: 'Växer ut snyggt utan skarpa ojämna linjer.', en: 'Grows out evenly without unruly demarcation lines.' }
      },
      {
        title: { sv: 'Snabb morgonstyling', en: 'Quick morning routine' },
        value: { sv: '2 minuter', en: '2 minutes' },
        desc: { sv: 'Faller naturligt på plats direkt efter fön och lätt produkt.', en: 'Falls into place naturally with minimal effort.' }
      }
    ],
    seo: {
      title: {
        sv: 'Klassisk Herrklippning vid Odenplan, Vasastan | Man With Class',
        en: 'Classic Men’s Haircut at Odenplan, Vasastan | Man With Class'
      },
      description: {
        sv: 'Se vårt referensarbete för klassisk herrklippning vid Odenplan i Vasastan, Stockholm. Saxprecision, skräddarsydd styling och tidlös elegans hos Man With Class.',
        en: 'Explore our reference project for classic men’s haircuts at Odenplan in Vasastan, Stockholm. Scissor precision and bespoke styling at Man With Class.'
      }
    }
  },
  {
    slug: 'skaggdesign-knivrakning-sankt-eriksplan',
    title: {
      sv: 'Skäggdesign & Traditionell Knivrakning med Varma Omslag',
      en: 'Beard Sculpting & Traditional Straight-Razor Shave'
    },
    location: {
      sv: 'Sankt Eriksplan, Vasastan',
      en: 'Sankt Eriksplan, Vasastan'
    },
    district: 'Sankt Eriksplan',
    category: 'beard',
    barber: {
      sv: 'Roy & Serhi',
      en: 'Roy & Serhi'
    },
    time: {
      sv: '45 min',
      en: '45 mins'
    },
    year: '2026',
    image: '/images/beard-detail.webp',
    gallery: [
      '/images/beard.webp',
      '/images/wash.webp',
      '/images/salon-chair.webp'
    ],
    excerpt: {
      sv: 'Skulpterade skägglinjer, symmetrisk volymkontroll och klassisk rakkniv med eteriska varma handdukar.',
      en: 'Sculpted beard lines, balanced volume, and authentic straight-razor shave with steaming essential oil towels.'
    },
    description: {
      sv: 'Ett fylligt skägg som tappat formen behövde en ordentlig omstrukturering. Vi formade skäggets yttre linjer med frihandssax och trimmer för att skapa en stark käklinje, följt av dubbla varma handdukar med eukalyptus och rakning med rakkniv för absolut renhet.',
      en: 'A dense beard that had lost its structural balance required expert reshaping. We sculpted outer parameters with shears and trimmers to emphasize the jawline, followed by dual eucalyptus hot towels and straight-razor detailing.'
    },
    challenge: {
      sv: 'Att jämna ut asymmetrisk skäggväxt vid kindbenen utan att tunna ut skäggets fylliga tyngd och maskulina profil.',
      en: 'Correcting asymmetrical cheekline growth while preserving the beard’s dense fullness and masculine profile.'
    },
    highlights: {
      sv: [
        'Formklippning av skäggmassa och mustaschkontur',
        'Dubbla varma ångande handdukar med lugnande eteriska oljor',
        'Klassisk knivrakning av hals- och kindlinjer med raklödder',
        'Återfuktande skäggolja och kylande aftershave balm som lugnar huden'
      ],
      en: [
        'Precision trimming of beard mass and mustache contour',
        'Dual steaming hot towels with soothing essential oils',
        'Traditional straight-razor shave on neck and cheekbones',
        'Nourishing beard oil and cooling aftershave balm to calm the skin'
      ]
    },
    results: [
      {
        title: { sv: 'Symmetriska linjer', en: 'Symmetrical lines' },
        value: { sv: '100% symmetri', en: '100% symmetry' },
        desc: { sv: 'Markerade kind- och halslinjer anpassade efter käklinjen.', en: 'Distinct cheek and neck contours enhancing the jaw.' }
      },
      {
        title: { sv: 'Hudkomfort', en: 'Skin comfort' },
        value: { sv: 'Noll irritation', en: 'Zero irritation' },
        desc: { sv: 'Förbehandling med varma handdukar skyddar känslig hy.', en: 'Hot towel pre-treatment prevents razor burn.' }
      },
      {
        title: { sv: 'Mjuk känsla', en: 'Soft feel' },
        value: { sv: 'Optimal näring', en: 'Optimal nourishment' },
        desc: { sv: 'Högkvalitativ skäggolja eliminerar stickighet och klåda.', en: 'Premium beard oil eliminates itchiness and coarse prickle.' }
      }
    ],
    seo: {
      title: {
        sv: 'Skäggtrimning & Knivrakning Sankt Eriksplan, Vasastan | Man With Class',
        en: 'Beard Trimming & Shave Sankt Eriksplan, Vasastan | Man With Class'
      },
      description: {
        sv: 'Se vårt referensprojekt för skäggdesign och traditionell knivrakning nära Sankt Eriksplan och Odenplan i Vasastan. Varma omslag och perfekt skäggfinish.',
        en: 'Reference project for beard grooming and traditional straight-razor shave near Sankt Eriksplan in Vasastan, Stockholm. Man With Class Barbershop.'
      }
    }
  },
  {
    slug: 'total-makeover-har-skagg-birkastan',
    title: {
      sv: 'Total Gentleman Makeover: Hår & Skägg Signature',
      en: 'Total Gentleman Makeover: Hair & Beard Signature'
    },
    location: {
      sv: 'Birkastan, Vasastan',
      en: 'Birkastan, Vasastan'
    },
    district: 'Birkastan',
    category: 'makeover',
    barber: {
      sv: 'Roy',
      en: 'Roy'
    },
    time: {
      sv: '60 min',
      en: '60 mins'
    },
    year: '2026',
    image: '/images/manW-Har-&-skagg.webp',
    gallery: [
      '/images/hair-beard.webp',
      '/images/salon-wide.webp',
      '/images/salon-brand.webp'
    ],
    excerpt: {
      sv: 'En komplett förvandling där frisyr och skägg förenas i en harmonisk, maskulin helhet med högsta finish.',
      en: 'A comprehensive transformation where haircut and beard unite into a harmonious, masculine aesthetic.'
    },
    description: {
      sv: 'Kunden kom in inför ett viktigt evenemang med utvuxet hår och ovårdat skägg. Målet var en komplett förvandling som lyfte fram personlighet och karaktär. Vi utförde en fullständig klippning med fade på sidorna och skulpterade skägget så att övergången mellan polisong och skägg blev helt sömlös.',
      en: 'The client arrived prior to a major event with overgrown hair and untamed facial hair. We performed a full taper haircut, blended the fade into the beard seamlessly, and defined crisp razor edges with hot towel therapy.'
    },
    challenge: {
      sv: 'Att skapa en mjuk sammanbindning mellan hårklippningen och skäggets övergång så att helhetsintrycket blir rent, enhetligt och elegant.',
      en: 'Crafting a fluid transition between haircut sideburns and beard density for a cohesive, refined look.'
    },
    highlights: {
      sv: [
        'Personlig stilanalys och rekommendation av längder',
        'Precision fade och saxklippning på hjässan med naturlig textur',
        'Komplett skäggtrimning och rakknivsdetaljering med varma handdukar',
        'Styling med premiumvax och doftande skäggbalsam'
      ],
      en: [
        'Personal style consultation and length recommendation',
        'Precision fade and shear-work on crown with natural texture',
        'Full beard sculpt and razor detailing with hot towels',
        'Style finish with matte paste and fragrant beard balm'
      ]
    },
    results: [
      {
        title: { sv: 'Helhetslyft', en: 'Complete upgrade' },
        value: { sv: 'Total förvandling', en: 'Full transformation' },
        desc: { sv: 'Markerade ansiktsdrag och en välvårdad, självsäker utstrålning.', en: 'Defined facial contours and confident, polished presence.' }
      },
      {
        title: { sv: 'Sömlös övergång', en: 'Seamless taper' },
        value: { sv: 'Fade to beard', en: 'Fade to beard' },
        desc: { sv: 'Perfekt tonad fade mellan polisong och skägg.', en: 'Flawlessly graded transition from sideburns into beard.' }
      },
      {
        title: { sv: 'Tidseffektiv lyx', en: 'Time-efficient luxury' },
        value: { sv: '60 minuter', en: '60 minutes' },
        desc: { sv: 'Både hår och skägg omhändertagna i en enda sittning.', en: 'Both hair and beard perfected in one comprehensive chair session.' }
      }
    ],
    seo: {
      title: {
        sv: 'Klippning & Skägg Birkastan, Vasastan | Man With Class',
        en: 'Haircut & Beard Birkastan, Vasastan | Man With Class'
      },
      description: {
        sv: 'Upptäck vår helhetsförvandling med herrklippning och skäggtrimning för kunder från Birkastan och Odenplan i Vasastan. Boka tid hos Man With Class.',
        en: 'Explore our complete hair and beard transformation package for clients in Birkastan and Vasastan, Stockholm. Book at Man With Class.'
      }
    }
  },
  {
    slug: 'modern-skin-fade-textured-crop-kungsholmen',
    title: {
      sv: 'Modern Skin Fade & Textured Crop',
      en: 'Modern Skin Fade & Textured Crop'
    },
    location: {
      sv: 'Kungsholmen, Stockholm',
      en: 'Kungsholmen, Stockholm'
    },
    district: 'Kungsholmen',
    category: 'cut',
    barber: {
      sv: 'Serhi',
      en: 'Serhi'
    },
    time: {
      sv: '45 min',
      en: '45 mins'
    },
    year: '2026',
    image: '/images/manW-Klippning-av-sidorna.webp',
    gallery: [
      '/images/salon-work.webp',
      '/images/hero-craft.webp',
      '/images/index-pic.webp'
    ],
    excerpt: {
      sv: 'Sömlös zero-fade med knivskarpa kanter kombinerat med strukturerad textur på toppen för en modern urban profil.',
      en: 'Seamless zero-fade with razor sharp perimeter lines combined with piecey texture on top for an urban edge.'
    },
    description: {
      sv: 'En ung yrkesverksam kund från Kungsholmen sökte en skarp, modern fade med textur. Vi byggde upp en låg till mellan Skin Fade med foil shaver för silkeslen yta, och klippte topplängden med point-cutting för att ge maximal rörelse och separation.',
      en: 'A young professional from Kungsholmen sought a sharp, contemporary fade with defined movement. We built a low-to-mid skin fade with a foil shaver for ultra-smooth contrast and point-cut the top for separation.'
    },
    challenge: {
      sv: 'Att uppnå en perfekt mjuk övergång från ren hud (0 mm) till mörkare densitet utan några synliga skuggor eller streck.',
      en: 'Achieving a flawless tonal blend from skin (0 mm) into density without visible graduation lines.'
    },
    highlights: {
      sv: [
        'Nivåanpassad Skin Fade med trimmer och foil shaver',
        'Point-cutting och effilering på toppen för textur och volym',
        'Rensning av nacklinje och tinningar med precisionstrimmer',
        'Styling med matt texturlera (matte clay) för flexibel stadga'
      ],
      en: [
        'Graduated skin fade executed with clippers and foil shaver',
        'Point-cutting on top for optimal volume and piecey texture',
        'Neckline and temple edge-up with detail trimmer',
        'Finished with matte styling clay for pliable hold'
      ]
    },
    results: [
      {
        title: { sv: 'Zero fade precision', en: 'Zero fade precision' },
        value: { sv: '0.0 mm finish', en: '0.0 mm finish' },
        desc: { sv: 'Extremt ren och mjuk toning från bar hud.', en: 'Ultra-clean, velvety transition from skin level.' }
      },
      {
        title: { sv: 'Flexibel textur', en: 'Pliable texture' },
        value: { sv: 'Enkel omstyling', en: 'Easy restyling' },
        desc: { sv: 'Håret kan formas om under dagen utan att tappa lyftet.', en: 'Hair can be restyled throughout the day effortlessly.' }
      },
      {
        title: { sv: 'Urban profil', en: 'Urban profile' },
        value: { sv: 'Modern look', en: 'Modern look' },
        desc: { sv: 'Passar både kostym och avslappnad street-stil.', en: 'Complements both tailored suits and casual weekend wear.' }
      }
    ],
    seo: {
      title: {
        sv: 'Skin Fade Herrfrisör Kungsholmen & Odenplan | Man With Class',
        en: 'Skin Fade Barber Kungsholmen & Odenplan | Man With Class'
      },
      description: {
        sv: 'Se vårt referensprojekt för Skin Fade & Textured Crop. Professionell barberare nära Kungsholmen och Odenplan i Vasastan, Stockholm. Boka din fade hos Man With Class.',
        en: 'Explore our Skin Fade reference work for clients from Kungsholmen and Vasastan. Precision fade and modern men’s styling at Man With Class.'
      }
    }
  },
  {
    slug: 'royal-luxury-treatment-spa-norrmalm',
    title: {
      sv: 'Royal Luxury Treatment: Klippning, Spa & Vaxning',
      en: 'Royal Luxury Treatment: Haircut, Spa & Waxing'
    },
    location: {
      sv: 'Norrmalm / City, Stockholm',
      en: 'Norrmalm / City, Stockholm'
    },
    district: 'Norrmalm',
    category: 'ritual',
    barber: {
      sv: 'Roy',
      en: 'Roy'
    },
    time: {
      sv: '75 min',
      en: '75 mins'
    },
    year: '2026',
    image: '/images/manW-Luxury-Treatment.webp',
    gallery: [
      '/images/royal.webp',
      '/images/wax.webp',
      '/images/salon-products.webp'
    ],
    excerpt: {
      sv: 'Vår ultimata helhetsupplevelse med herrklippning, skäggvård, ansiktsmassage, ånga och vaxning av oönskat hår.',
      en: 'Our ultimate luxury chair ritual featuring haircut, beard care, facial massage, steam, and wax detailing.'
    },
    description: {
      sv: 'För kunden som vill koppla bort vardagen och uppleva traditionell barberarlyx i toppklass. Vi kombinerade herrklippning och skäggstyling med en exklusiv ansiktsbehandling: varm ånga, ansiktsrengöring, skalpmassage samt skonsam vaxning av öron och näsa.',
      en: 'Designed for clients who value tranquility and premier grooming. We combined precision cutting and beard styling with an exclusive facial ritual: hot towels, botanical scrub, scalp massage, and ear/nose wax detailing.'
    },
    challenge: {
      sv: 'Att skapa en lugn och exklusiv spastämning med maximal avkoppling samtidigt som varje tekniskt klippmoment utförs med kirurgisk precision.',
      en: 'Delivering a peaceful spa-like atmosphere for complete unwind while maintaining surgical cutting precision.'
    },
    highlights: {
      sv: [
        'Komplett skräddarsydd herrklippning och skäggskulptering',
        'Varm ansiktsånga och rengörande exfoliering',
        'Skonsam vaxning av öron- och näshår för en ren profil',
        'Djupgående nack- och skalpmassage med stärkande tonic'
      ],
      en: [
        'Full bespoke haircut and beard contouring',
        'Steaming facial towels and revitalizing exfoliation',
        'Gentle ear and nose wax detailing for ultra-clean finish',
        'Invigorating scalp and neck massage with fortifying tonic'
      ]
    },
    results: [
      {
        title: { sv: 'Total avkoppling', en: 'Total relaxation' },
        value: { sv: '75 minuters spa', en: '75 min spa ritual' },
        desc: { sv: 'En paus från stadens tempo med oslagbart välbefinnande.', en: 'An oasis of calm away from the city bustle.' }
      },
      {
        title: { sv: 'Komplett fräschör', en: 'Complete freshness' },
        value: { sv: '100% renhet', en: '100% clean feel' },
        desc: { sv: 'Vaxning och ånga ger ett långvarigt rent intryck.', en: 'Waxing and steam treatment leave a pristine feel for weeks.' }
      },
      {
        title: { sv: 'Premiumfinish', en: 'Premium finish' },
        value: { sv: 'Högsta nivå', en: 'Top-tier finish' },
        desc: { sv: 'En look som utstrålar framgång och omtanke om detaljer.', en: 'A distinguished look projecting confidence and elegance.' }
      }
    ],
    seo: {
      title: {
        sv: 'Luxury Herrbehandling Norrmalm & Odenplan | Man With Class',
        en: 'Luxury Men’s Grooming Norrmalm & Odenplan | Man With Class'
      },
      description: {
        sv: 'Referensprojekt: Royal Luxury Treatment hos Man With Class vid Odenplan i Vasastan. Klippning, skägg, spa och vaxning för kunder från Norrmalm och Stockholm.',
        en: 'Reference project: Royal Luxury Treatment at Man With Class, Odenplan in Vasastan. Haircut, beard spa, and wax detailing in Stockholm.'
      }
    }
  },
  {
    slug: 'ungdom-student-modern-taper-fade-ostermalm',
    title: {
      sv: 'Ungdom & Student Modern Taper Fade',
      en: 'Youth & Student Modern Taper Fade'
    },
    location: {
      sv: 'Östermalm, Stockholm',
      en: 'Östermalm, Stockholm'
    },
    district: 'Östermalm',
    category: 'modern',
    barber: {
      sv: 'Serhi',
      en: 'Serhi'
    },
    time: {
      sv: '35 min',
      en: '35 mins'
    },
    year: '2026',
    image: '/images/manW-Ungdom-student.webp',
    gallery: [
      '/images/salon-work.webp',
      '/images/hero-craft.webp',
      '/images/salon-chair.webp'
    ],
    excerpt: {
      sv: 'Ren taper fade vid tinningar och nacke med bibehållen volym på toppen – trendigt, stilrent och lättskött för studenter och unga.',
      en: 'Crisp taper fade at temples and nape preserving natural weight on top – trendy, sharp and low-maintenance.'
    },
    description: {
      sv: 'Studenten från Östermalm ville ha en trendig frisyr som inte kräver konstant underhåll men ändå har skarpa konturer. Vi skapade en Low Taper Fade som ger ett rent intryck kring öronen och nacken men behåller mjukhet och fyllighet upptill.',
      en: 'A student from Östermalm requested a clean, trendy style that requires low daily maintenance. We crafted a subtle Low Taper Fade that defines the neckline and temples while retaining fullness and organic movement on top.'
    },
    challenge: {
      sv: 'Att leverera högsta precision inom en mer tidseffektiv och studentvänlig ram utan att kompromissa med salongens höga kvalitetsstandard.',
      en: 'Delivering sharp craft within an efficient, student-friendly frame without sacrificing salon quality.'
    },
    highlights: {
      sv: [
        'Konsultation kring hårets naturliga fall och virvlar',
        'Taper fade vid polisonger och nacke med skarp kantmarkering',
        'Saxklippning och texturering på toppen',
        'Snabb stylingguide med havssaltsspray och matt kräm'
      ],
      en: [
        'Consultation matching natural cowlicks and growth flow',
        'Taper fade at sideburns and neckline with crisp outline',
        'Shear trimming and texturizing on crown',
        'Fast styling advice using sea salt spray and matte cream'
      ]
    },
    results: [
      {
        title: { sv: 'Trendig silhuett', en: 'Trendy silhouette' },
        value: { sv: 'Modern Taper', en: 'Modern Taper' },
        desc: { sv: 'Snygg kontrast mellan fyllighet och rena kanter.', en: 'Stylish contrast between volume and tapered clean edges.' }
      },
      {
        title: { sv: 'Prisvärd kvalitet', en: 'Student value' },
        value: { sv: 'Studentrabatt', en: 'Student value' },
        desc: { sv: 'Förstklassigt hantverk till ett förmånligare pris.', en: 'High-end barber craft at an accessible student rate.' }
      },
      {
        title: { sv: 'Enkel vardag', en: 'Effortless routine' },
        value: { sv: '1 min styling', en: '1 min styling' },
        desc: { sv: 'Perfekt resultat med bara lite saltvattenspray.', en: 'Effortless finish with just a light spritz of sea salt.' }
      }
    ],
    seo: {
      title: {
        sv: 'Studentklippning & Taper Fade Östermalm & Odenplan | Man With Class',
        en: 'Student Haircut & Taper Fade Östermalm & Odenplan | Man With Class'
      },
      description: {
        sv: 'Referensarbete: Modern Taper Fade och ungdomsklippning nära Östermalm och Odenplan i Stockholm. Trendigt, skarpt och prisvärt hos Man With Class.',
        en: 'Reference work: Modern Taper Fade & student haircut near Östermalm and Odenplan in Stockholm. Sharp craft at Man With Class.'
      }
    }
  }
];

export default projects;
