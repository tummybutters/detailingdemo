export default function ServiceProcess() {
  const steps = [
    {
      number: 1,
      title: "Inspection",
      description: "We begin with a thorough inspection to identify areas needing special attention."
    },
    {
      number: 2,
      title: "Preparation",
      description: "Careful pre-treatment of surfaces to ensure optimal cleaning and protection results."
    },
    {
      number: 3,
      title: "Detailing",
      description: "Meticulous cleaning, restoration, and enhancement of all vehicle surfaces."
    },
    {
      number: 4,
      title: "Final Inspection",
      description: "Comprehensive quality check to ensure every detail meets our high standards."
    }
  ];

  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-heading text-gray-900 mb-4">Our Detailing Process</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We follow a meticulous process to ensure exceptional results every time.
          </p>
        </div>
        
        <div className="relative">
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-primary/20 -translate-y-1/2 z-0"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step) => (
              <div key={step.number} className="relative">
                <div className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4 z-10 relative">
                  {step.number}
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-bold font-heading text-gray-900 mb-2 text-center">{step.title}</h3>
                  <p className="text-gray-600 text-center">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
