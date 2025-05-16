import TechItem from "../cards/TechnologyItem";
import { frontendTech, backendTech } from "@/data/technologySectionData";

const TechnologySection = () => {
  return (
    <section
      id="technology"
      className="py-12 bg-gray-50 dark:bg-primary-foreground"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-primary font-semibold tracking-wide uppercase">
            Technology
          </h2>

          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-dark sm:text-4xl">
            Modern technology stack
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            This application was built using the latest technology to provide
            the best performance and optimal user experience.
          </p>
        </div>
        <div className="mt-10">
          <h4 className="font-bold text-xl text-center">Front End</h4>
          <div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-4 sm:grid-cols-2">
            {frontendTech.map((item, index) => (
              <TechItem
                name={item.name}
                icon={item.icon}
                description={item.description}
                key={index}
              />
            ))}
          </div>
        </div>

        <div className="mt-10">
          <h4 className="font-bold text-xl text-center">Back End</h4>
          <div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-4 sm:grid-cols-2">
            {backendTech.map((item, index) => (
              <TechItem
                name={item.name}
                icon={item.icon}
                description={item.description}
                key={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnologySection;
