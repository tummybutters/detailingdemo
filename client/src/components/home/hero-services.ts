export const SERVICES_DATA = [
  {
    id: 'interior',
    title: 'Interior Detail',
    price: 199,
    description: "Deep cleaning and conditioning for seats, carpets, dashboard, and all interior surfaces.",
    duration: '2-3 hours',
    target: 'interior',
    features: [
      'Deep vacuum & steam cleaning',
      'Leather conditioning & protection',
      'Dashboard & trim restoration',
      'Pet hair removal specialist'
    ],
    addOns: [
      { name: 'Leather Conditioning', price: 49, target: 'interior_detail' },
      { name: 'Carpet Shampoo', price: 89, target: 'interior_detail' },
      { name: 'Pet Hair Removal', price: 69, target: 'interior_floor' },
      { name: 'Rubber Floor Mat Restoration', price: 29, target: 'floor_mat' }
    ]
  },
  {
    id: 'exterior',
    title: 'Exterior Detail',
    price: 149,
    description: "Complete exterior restoration and protection for your vehicle's paint, wheels, and trim.",
    duration: '1.5-2 hours',
    target: 'exterior',
    features: [
      'Premium hand wash & dry',
      'Clay bar paint decontamination',
      'High-quality wax protection',
      'Wheel & tire detailing'
    ],
    addOns: [
      { name: 'Clay Bar Treatment', price: 39, target: 'paint' },
      { name: 'Machine Ceramic Wax', price: 149, target: 'paint' },
      { name: 'Headlight Restoration', price: 99, target: 'front' },
      { name: 'Engine Bay Detail', price: 99, target: 'engine' },
      { name: 'Scratch Buffing', price: 75, target: 'paint' }
    ]
  },
  {
    id: 'paint_correction',
    title: 'Paint Correction Polish',
    price: 299,
    description: 'Machine polish to remove swirls and revive gloss across the full exterior.',
    duration: '2-3 hours',
    target: 'paint_correction',
    features: [
      'Multi-stage paint correction',
      'Swirl & light scratch reduction',
      'Refined gloss finish',
      'Panel-by-panel inspection'
    ],
    addOns: []
  },
  {
    id: 'ceramic_coating',
    title: 'Ceramic Coating',
    price: 399,
    description: 'Durable ceramic protection for deep gloss and easier maintenance.',
    duration: '3-4 hours',
    target: 'ceramic_coating',
    features: [
      'Professional ceramic application',
      'Hydrophobic self-cleaning effect',
      'UV and chemical resistance',
      'Extended durability and shine'
    ],
    addOns: []
  }
] as const;

export const VIEW_CONTENT = {
  home: {
    title: "WELCOME TO HARDY'S",
    description: "The ultimate mobile detailing experience. Spin to explore.",
    position: { top: '120px', right: '32px' }
  },
  exterior: {
    title: "EXTERIOR DETAIL",
    description: "Signature hand wash and wax restoration. Protects paint, enhances shine.",
    position: { top: '120px', right: '32px' }
  },
  interior: {
    title: "INTERIOR DETAIL",
    description: "Complete cabin restoration. Deep vacuuming, leather conditioning, and sanitization.",
    position: { top: '34%', right: '22%' }
  },
  engine: {
    title: "ENGINE BAY DETAIL",
    description: "Safe degreasing and dressing. Keeps your powertrain looking showroom new.",
    position: { top: '12%', left: '18%' }
  },
  front: {
    title: "HEADLIGHT RESTORATION",
    description: "Restore clarity and brightness. Improves visibility and safety.",
    position: { top: '18%', left: '36%' }
  },
  interior_floor: {
    title: "PET HAIR REMOVAL",
    description: "Specialized removal of stubborn hair. Clears what standard vacuums miss.",
    position: { top: '48%', left: '50%', transform: 'translate(-50%, -50%)' }
  },
  paint_correction: {
    title: "PAINT CORRECTION",
    description: "Multi-stage machine polishing. Removes swirls for a mirror-like finish.",
    position: { top: '25%', left: '62%', transform: 'translate(-50%, -50%)' }
  },
  ceramic_coating: {
    title: "CERAMIC COATING",
    description: "Long-lasting nano-protection. Repels water, dirt, and UV rays for years.",
    position: { top: '18%', left: '34%', transform: 'translate(-50%, -50%)' }
  },
  wheel: {
    title: "WHEEL & TIRE PACKAGE",
    description: "Deep cleaning of faces and barrels. Finished with a premium satin dressing.",
    position: { bottom: '100px', left: '400px' }
  },
  paint: {
    title: "PREMIUM PAINT CARE",
    description: "Decontamination and protection. Ensures a smooth, glass-like surface.",
    position: { top: '120px', right: '32px' }
  },
  interior_detail: {
    title: "DEEP INTERIOR CARE",
    description: "Intensive treatment for leather and carpets. Revitalizes your cabin's feel.",
    position: { top: '34%', right: '22%' }
  },
  floor_mat: {
    title: "FLOOR MAT RESTORATION",
    description: "Detailed rubber mat cleaning and dressing. Focused on the driver's footwell.",
    position: { top: '58%', left: '62%', transform: 'translate(-50%, -50%)' }
  },
  paint_detail: {
    title: "PAINT INSPECTION",
    description: "Close-up analysis of paint defects to determine the perfect correction approach.",
    position: { top: '120px', right: '32px' }
  },
  right_side: {
    title: "SIDE PROFILE",
    description: "A comprehensive view of the vehicle's profile and door finish.",
    position: { top: '120px', right: '32px' }
  }
} as const;
