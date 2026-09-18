export const people = [
    {
        slug: 'roy', name: 'Roy', fullName: 'Roy Wan / Wan de Roy', published: true,
        role: { sv: 'Barberare / Wan de Roy Sthlm', en: 'Barber / Wan de Roy Sthlm' },
        portrait: '/images/Roy-frisor.png', position: '42% 30%',
        intro: { sv: 'The craft is over. We came a long way.', en: 'The craft is over. We came a long way.' },
        presentation: {
            sv: 'Roy driver herrmodemärket Wan de Roy Sthlm. Resan började i Stockholm, med en passion för italiensk skräddarkonst och limiterade upplagor. Vägen har lett till samarbeten med internationella plattformar som MenWithClass och en fast punkt hos herrmodebutiken Menswear på Jungfrugatan i Stockholm. En personlig resa med hantverket, materialen och det klassiska herrmodet i centrum.',
            en: 'Roy runs the menswear label Wan de Roy Sthlm. His journey began in Stockholm, with a passion for Italian tailoring and limited editions. It has led to collaborations with international platforms such as MenWithClass and a base at Menswear on Jungfrugatan in Stockholm. A personal journey centred on craftsmanship, materials and classic menswear.'
        },
        specialties: { sv: ['Stil & skrädderi', 'Kollektioner', 'Personlig stil'], en: ['Style & tailoring', 'Collections', 'Personal style'] },
        timeline: [
            { label: { sv: '2018', en: '2018' }, text: { sv: 'De första visionerna och grunden för ett skräddarsytt modeuttryck tar form i Stockholm.', en: 'The first ideas and the foundations of a tailored approach to style take shape in Stockholm.' } },
            { label: { sv: '2020–2022', en: '2020–2022' }, text: { sv: 'Konceptet med extremt limiterade kollektioner etableras, ofta endast 15 exemplar per plagg. En kundkrets växer fram som uppskattar quiet luxury och genuint hantverk.', en: 'The concept of highly limited collections takes shape, often with just 15 pieces per garment. A following develops around quiet luxury and genuine craftsmanship.' } },
            { label: { sv: 'Nästa kapitel', en: 'The next chapter' }, text: { sv: 'Wan de Roy tar nästa steg genom samarbeten med MenWith-nätverket. Behind the brand i Stockholm och på den internationella modescenen.', en: 'Wan de Roy takes the next step through collaborations with the MenWith network. Behind the brand in Stockholm and on the international fashion scene.' } }
        ],
        storyEyebrow: 'Behind the brand',
        storyTitle: { sv: ['HISTORIEN.', 'HANTVERKET.'], en: ['THE STORY.', 'THE CRAFT.'] },
        storySignoff: { sv: 'Vi ses i studion.', en: 'See you in the studio.' },
        galleryIds: ['result-herrklippning', 'result-har-och-skagg', 'result-luxury-treatment', 'our-name'],
        galleryNote: { sv: 'Ett urval ur Man With Class gemensamma bildgalleri – klippningar, skägg och salongsmiljö.', en: 'A selection from the shared Man With Class gallery — haircuts, beards and the salon.' },
        instagram: 'https://www.instagram.com/wanderoysthlm/',
        contactLabel: { sv: 'Kontakta Roy', en: 'Contact Roy' },
        contactNote: { sv: 'För förfrågningar och måttbeställningar, kontakta @wanderoysthlm. Kollektionerna säljs i strikt begränsad upplaga.', en: 'For enquiries and made-to-measure orders, contact @wanderoysthlm. Collections are available in strictly limited editions.' }
    },
    {
        slug: 'serhi', name: 'Serhi', fullName: 'Serhi / Man With Class', published: true,
        role: { sv: 'Barberare', en: 'Barber' }, portrait: '/images/Serhi-frisor.png',
        intro: { sv: 'Möt Serhi hos Man With Class vid Odenplan.', en: 'Meet Serhi at Man With Class, Odenplan.' },
        presentation: {
            sv: 'Serhi är en av barberarna hos Man With Class på Upplandsgatan 51 i Stockholm. Välj Serhi och den behandling du vill boka på Bokadirekt, där du också hittar aktuella priser och lediga tider.',
            en: 'Serhi is one of the barbers at Man With Class on Upplandsgatan 51 in Stockholm. Select Serhi and your chosen treatment on Bokadirekt, where you can also find current prices and availability.'
        },
        specialties: { sv: [], en: [] },
        storyEyebrow: 'Behind the chair',
        storyTitle: { sv: ['DITT BESÖK.', 'DIN STUND.'], en: ['YOUR VISIT.', 'YOUR MOMENT.'] },
        storySignoff: { sv: 'Vi ses vid stolen.', en: 'See you in the chair.' },
        timeline: [
            { label: { sv: 'Välj behandling', en: 'Choose your treatment' }, text: { sv: 'Utforska salongens behandlingsmeny och välj det du vill boka.', en: 'Explore the salon treatment menu and choose what you would like to book.' } },
            { label: { sv: 'Boka med Serhi', en: 'Book with Serhi' }, text: { sv: 'Välj Serhi som utförare i Bokadirekt och hitta en ledig tid som passar dig.', en: 'Select Serhi as your barber on Bokadirekt and find an available time that suits you.' } },
            { label: { sv: 'Välkommen till Odenplan', en: 'Welcome to Odenplan' }, text: { sv: 'Du hittar Man With Class på Upplandsgatan 51 i Vasastan, Stockholm.', en: 'Find Man With Class at Upplandsgatan 51 in Vasastan, Stockholm.' } }
        ],
        galleryIds: ['result-maskinklippning', 'result-klippning-sidor', 'result-skaggtrimning', 'the-space'],
        galleryNote: { sv: 'Ett urval ur Man With Class gemensamma bildgalleri – klippningar, skägg och salongsmiljö.', en: 'A selection from the shared Man With Class gallery — haircuts, beards and the salon.' },
        contactNote: { sv: 'Välj Serhi som utförare när du bokar via salongens Bokadirekt-sida.', en: 'Select Serhi as your barber when booking through the salon’s Bokadirekt page.' }
    }
];

export const publishedPeople = people.filter(person => person.published);
