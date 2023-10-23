import "/src/css/components/features.css";
import FeatureItem from "/src/components/FeatureItem.jsx";

export default function features() {
  return (
    <>
      <section className="features">
        <h2 className="sr-only">Features</h2>
        <FeatureItem
          imagePath="/src/assets/img/icon-chat.png"
          imageAlt="Chat Icon"
          title="You are our #1 priority"
          description="Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes."
        />
        <FeatureItem
          imagePath="/src/assets/img/icon-money.png"
          imageAlt="Money Icon"
          title="More savings means higher rates"
          description="The more you save with us, the higher your interest rate will be!"
        />
        <FeatureItem
          imagePath="/src/assets/img/icon-security.png"
          imageAlt="Security Icon"
          title="Security you can trust"
          description="We use top of the line encryption to make sure your data and money
          is always safe."
        />
      </section>
    </>
  );
}
