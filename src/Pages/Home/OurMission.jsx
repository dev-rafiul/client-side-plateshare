const OurMission = () => {
  const data = [
    {
      id: 1,
      title: "Total Donors",
      desc: "We will always provide you the highest can afford this",
      icon: "7.3k+",
    },
    {
      id: 2,
      title: "Meals Shared",
      desc: "Every shared meal can brighten someone's day. Donate your extra food and spread kindness one plate at a time.",
      icon: "16.4k+",
    },
    {
      id: 3,
      title: "Communities Reached",
      desc: "Turn leftover meals into community support. Share food, reduce waste, and make a difference together.",
      icon: "350+",
    },
  ];

  return (
    <section className="py-16 bg-base-100">
      <div className="text-center mb-4">
        <span className="px-4 py-1 bg-primary bg-opacity-20 text-white rounded-full text-sm font-medium">
          Our Mission
        </span>
      </div>

      <h2 className="text-4xl font-bold text-center mb-3 text-base-content">
        Who are <span className="text-primary">We</span> Our Mission
      </h2>

      <p className="max-w-2xl mx-auto text-base-content opacity-70 mb-14 text-center">
        Our mission is to create a community where no food goes to waste and
        no one goes hungry. Together, we build a sustainable and caring
        environment.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-6xl mx-auto px-6">
        {data.map((item) => (
          <div
            key={item.id}
            className="bg-base-200 p-8 rounded-2xl border border-base-300
                       shadow-lg text-center"
          >
            <div className="text-3xl bg-primary text-primary-content mx-auto w-[150px] h-[150px] font-semibold flex justify-center items-center rounded-[100px] mb-4">{item.icon}</div>
            <h3 className="text-xl font-semibold mb-2 text-base-content">{item.title}</h3>
            <p className="text-base-content opacity-70 text-sm leading-relaxed">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurMission;