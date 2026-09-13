/**
 * questionGenerator.js - Dynamic MCQ & Flashcard Generator from Static & CA datasets
 */

export const generateFlashcardsFromData = (type, rawData) => {
  if (!rawData) return [];

  if (type === 'countries') {
    return (rawData.records || []).map((c, i) => ({
      id: `FC-COUNTRY-${i}`,
      category: 'Countries & Currencies',
      front: `What is the Capital and Currency of ${c.country}?`,
      back: `Capital: ${c.capital}\nCurrency: ${c.currency} (${c.code})\nContinent: ${c.continent}\nKey Fact: ${c.notes}`,
      hint: `Continent: ${c.continent}`
    }));
  }

  if (type === 'states') {
    return (rawData.records || []).map((s, i) => ({
      id: `FC-STATE-${i}`,
      category: 'Indian States & UTs',
      front: `Identify the Capital, High Court, and Folk Dance of ${s.name}`,
      back: `Capital: ${s.capital}\nHigh Court: ${s.high_court}\nCM: ${s.chief_minister || 'N/A'}\nFolk Dances: ${(s.folk_dances || []).slice(0, 3).join(', ')}\nState Animal: ${s.state_animal}`,
      hint: `Located in ${s.type}`
    }));
  }

  if (type === 'orgs') {
    return (rawData.records || []).map((o, i) => ({
      id: `FC-ORG-${i}`,
      category: 'International Organisations',
      front: `Where is ${o.name} (${o.abbreviation}) headquartered, and who is its current head?`,
      back: `Headquarters: ${o.headquarters}\nCurrent Head: ${o.current_head}\nEstablished: ${o.established}\nKey Reports: ${(o.key_reports || []).join(', ') || 'N/A'}`,
      hint: `Established in ${o.established}`
    }));
  }

  if (type === 'parks') {
    return (rawData.records || []).map((p, i) => ({
      id: `FC-PARK-${i}`,
      category: 'National Parks & Wildlife',
      front: `Which state is ${p.name} located in, and what is its key flagship species?`,
      back: `State: ${p.state}\nKey Species: ${p.key_species}\nCategory: ${p.category}\nFact: ${p.facts}`,
      hint: `Category: ${p.category}`
    }));
  }

  if (type === 'schemes') {
    return (rawData.schemes || []).map((s, i) => ({
      id: `FC-SCHEME-${i}`,
      category: 'Government Schemes',
      front: `What are the core parameters of ${s.name}?`,
      back: `Nodal Ministry: ${s.nodal_ministry || s.nodal_agency}\nLaunch Date: ${s.launch_date}\nKey Outlay/Benefit: ${s.financial_benefit || s.total_outlay || s.risk_coverage || 'Targeted financial assistance'}\nExam Focus: ${s.exam_relevance}`,
      hint: `Ministry: ${s.nodal_ministry || s.nodal_agency}`
    }));
  }

  return [];
};
