// utils/wasteCategories.ts
export const wasteCategories = [
    'mixed',
    'plastics',
    'glass',
    'paper',
    'bio',
    'bulky',
    'electronics',
    'ash',
  ];
  
  export const wasteCategoryOptions = [
    { value: 'mixed', label: '🗑️zmieszane odpady komunalne' },
    { value: 'plastics', label: '🟡tworzywa sztuczne, metal, opakowania wielomateriałowe (worek żółty)' },
    { value: 'glass', label: '🟢szkło białe i kolorowe (worek zielony)' },
    { value: 'paper', label: '🔵papier, tektura (worek niebieski)' },
    { value: 'bio', label: '🟤odpady biodegradowalne (worek brązowy)' },
    { value: 'bulky', label: '🪑odpady wielkogabarytowe' },
    { value: 'electronics', label: '📻zużyty sprzęt elektryczny i elektroniczny' },
    { value: 'ash', label: '🚬popiół' },
  ];
  
  export const categoryLabels: { [key: string]: string } = {
    mixed: '🗑️ zmieszane odpady komunalne',
    plastics: '🟡 tworzywa sztuczne, metal, opakowania wielomateriałowe (worek żółty)',
    glass: '🟢 szkło białe i kolorowe (worek zielony)',
    paper: '🔵 papier, tektura (worek niebieski)',
    bio: '🟤 odpady biodegradowalne (worek brązowy)',
    bulky: '🪑 odpady wielkogabarytowe',
    electronics: '📻 zużyty sprzęt elektryczny i elektroniczny',
    ash: '🚬 popiół',
  };