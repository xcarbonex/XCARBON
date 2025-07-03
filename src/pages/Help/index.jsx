import React from "react";
import { Typography, Accordion, Breadcrumb } from "@/components";

function Help() {
  const breadcrumbItems = [
    { label: "Home", path: "/" },
    { label: "Help", path: "/help" },
  ];

  const faqs = [
    {
      question:
        "What is the difference between compliance and voluntary carbon markets?",
      answer:
        "Compliance markets are established by national, regional, or international carbon reduction policies, where companies are legally bound to cap their emissions. Voluntary markets, on the other hand, allow companies and individuals to purchase carbon credits to offset their emissions on a voluntary basis, often as part of corporate social responsibility initiatives.",
    },
    {
      question: "How are carbon credits verified?",
      answer:
        "Carbon credits are typically verified by independent third-party organizations against recognized standards (e.g., Verified Carbon Standard, Gold Standard). This verification process ensures that the emission reductions are real, measurable, permanent, additional, and independently verified.",
    },
    {
      question: "Can individuals buy carbon credits?",
      answer:
        "Yes, individuals can buy carbon credits to offset their personal carbon footprint, supporting projects that reduce greenhouse gas emissions. Many platforms facilitate these purchases, making it accessible for individuals to contribute to climate action.",
    },
    {
      question: "What are the benefits of investing in carbon credits?",
      answer:
        "Investing in carbon credits offers several benefits, including contributing to global climate goals, enhancing corporate social responsibility (CSR) profiles, meeting regulatory requirements, and potentially generating financial returns as carbon prices fluctuate.",
    },
    {
      question: "Are all carbon credits the same?",
      answer:
        "No, carbon credits vary based on the project type, verification standard, location, and vintage (the year the emissions reductions occurred). It's important to understand these differences when purchasing credits to ensure they align with your objectives and are of high quality.",
    },
  ];

  return (
    <div className="transition-all duration-slow">
      <div className="space-y-5 text-black dark:text-[#FFFFFF]/80">
        <Typography variant="h4" className="border-b-2 border-[#363638] pb-2">
          Help & Support
        </Typography>
        <Breadcrumb items={breadcrumbItems} />

        <div className="grid shadow-xl p-4 border rounded-custom dark:bg-[#191919] bg-[#FDFDFB]">
          <Typography variant="h5" className="pb-3 text-black dark:text-white">
            What are Carbon Credits?
          </Typography>
          <div className="flex flex-col md:flex-row items-center gap-5">
            <p className="text-sm text-black dark:text-[#949494] leading-relaxed">
              Carbon credits are measurable, verifiable permits that allow the
              owner to emit one tonne of carbon dioxide (CO2e) equivalent from a
              specified project. They are used to offset greenhouse gas
              emissions and are a key tool in mitigating climate change.
              Projects that reduce, remove, or avoid greenhouse gas emissions
              can generate carbon credits. These can include initiatives in
              renewable energy, energy efficiency, reforestation, sustainable
              agriculture, and waste management.
              <br />
              <br />
              The goal of carbon credits is to create a market-based system that
              incentivizes emissions reductions. By attaching a monetary value
              to carbon emissions, companies and individuals are encouraged to
              invest in cleaner technologies and practices. This system helps
              facilitate the transition to a low-carbon economy, promoting
              sustainable development and environmental stewardship.
            </p>
          </div>
        </div>

        <div className="grid shadow-xl p-4 border rounded-custom dark:bg-[#191919] bg-[#FDFDFB]">
          <Typography variant="h5" className="pb-3 text-black dark:text-white">
            How to Use Carbon Credits?
          </Typography>
          <p className="text-sm text-black dark:text-[#949494] leading-relaxed">
            Carbon credits can be bought and sold on various markets, including
            compliance markets (where emission reductions are legally mandated)
            and voluntary markets (where entities voluntarily offset their
            emissions). Companies that exceed their emission targets can
            purchase credits from those who have reduced their emissions below
            their targets. This flexibility allows for cost-effective emission
            reductions across different sectors.
            <br />
            <br />
            Typically, carbon credits are used by corporations to meet
            compliance obligations set by regulatory bodies or as part of
            voluntary commitments to reduce their carbon footprint. Individuals
            can also purchase carbon credits to offset their personal emissions,
            contributing to global sustainability efforts. It\'s crucial to
            ensure that the carbon credits purchased are from reputable projects
            that deliver genuine and additional emission reductions. Due
            diligence on the project\'s methodology, additionality, and
            permanence is essential.
          </p>
        </div>

        <div className="grid shadow-xl p-4 border rounded-custom dark:bg-[#191919] bg-[#FDFDFB]">
          <Typography variant="h5" className="pb-3 text-black dark:text-white">
            The Carbon Credit Ecosystem
          </Typography>
          <div className="flex flex-col md:flex-row items-center gap-5">
            <p className="text-sm text-black dark:text-[#949494] leading-relaxed">
              The carbon credit ecosystem involves several key players: project
              developers who implement emission reduction projects, verification
              bodies that ensure the projects meet established standards,
              registries that track and issue carbon credits, and buyers
              (companies or individuals) who purchase these credits to offset
              their emissions. This interconnected system facilitates the flow
              of credits from creation to retirement.
              <br />
              <br />
              Technological advancements, such as blockchain, are increasingly
              being integrated into this ecosystem to enhance transparency,
              traceability, and efficiency in the issuance and trading of carbon
              credits. This helps to build trust and integrity in the market,
              ensuring that each credit represents a verified and unique
              reduction in greenhouse gas emissions.
            </p>
          </div>
        </div>

        <div className="grid shadow-xl p-4 border rounded-custom dark:bg-[#191919] bg-[#FDFDFB]">
          <Typography variant="h5" className="pb-3 text-black dark:text-white">
            The Carbon Credit Project Lifecycle
          </Typography>
          <div className="flex flex-col md:flex-row items-center gap-5">
            <p className="text-sm text-black dark:text-[#949494] leading-relaxed">
              The generation and use of carbon credits follow a structured
              lifecycle:
              <ul className=" mt-2 space-y-2">
                <li>
                  <b>Project Development:</b> Identifying and designing projects
                  that reduce or remove greenhouse gas emissions (e.g.,
                  renewable energy, reforestation).
                </li>
                <li>
                  <b>Validation:</b> Independent third-party assessment to
                  ensure the project meets a recognized carbon standard and its
                  methodologies are sound.
                </li>
                <li>
                  <b>Monitoring:</b> Continuous measurement and reporting of
                  actual emission reductions achieved by the project.
                </li>
                <li>
                  <b>Verification:</b> Another independent third-party audit to
                  confirm the reported emission reductions are accurate and meet
                  the standard's requirements.
                </li>
                <li>
                  <b>Issuance:</b> Once verified, carbon credits are issued by a
                  registry, each representing one tonne of CO2e reduced or
                  removed.
                </li>
                <li>
                  <b>Trading:</b> Credits can be bought and sold on compliance
                  or voluntary markets.
                </li>
                <li>
                  <b>Retirement:</b> Credits are permanently removed from
                  circulation once used to offset emissions, preventing
                  double-counting.
                </li>
              </ul>
            </p>
          </div>
        </div>

        <div className="grid shadow-xl p-4 border rounded-custom dark:bg-[#191919] bg-[#FDFDFB]">
          <Typography variant="h5" className="pb-3 text-black dark:text-white">
            Benefits of Carbon Credits
          </Typography>
          <ul className=" text-sm text-black dark:text-[#949494] leading-relaxed space-y-2">
            <li>
              <b>Environmental Impact:</b> Directly contributes to the reduction
              of global greenhouse gas emissions, combating climate change.
            </li>
            <li>
              <b>Economic Incentives:</b> Provides financial incentives for
              businesses and organizations to adopt sustainable practices and
              invest in green technologies.
            </li>
            <li>
              <b>Sustainable Development:</b> Supports projects that often have
              co-benefits such as biodiversity conservation, improved public
              health, and job creation in local communities.
            </li>
            <li>
              <b>Regulatory Compliance:</b> Helps companies meet mandatory
              emission reduction targets imposed by governments and
              international agreements.
            </li>
            <li>
              <b>Enhanced Reputation:</b> Improves corporate image and
              demonstrates a commitment to environmental stewardship, appealing
              to conscious consumers and investors.
            </li>
          </ul>
        </div>

        <div className="grid shadow-xl p-4 border rounded-custom dark:bg-[#191919] bg-[#FDFDFB]">
          <Typography variant="h5" className="pb-3 text-black dark:text-white">
            Challenges and Future of Carbon Markets
          </Typography>
          <p className="text-sm text-black dark:text-[#949494] leading-relaxed">
            Despite their potential, carbon markets face challenges such as
            ensuring the integrity and additionality of credits, preventing
            double-counting, and managing price volatility. The future of carbon
            markets is likely to involve increased standardization, greater
            transparency through advanced technologies like blockchain, and the
            expansion of market mechanisms to include more sectors and regions.
            There's a growing emphasis on high-quality, nature-based solutions
            and direct air capture technologies to further accelerate
            decarbonization efforts.
          </p>
        </div>

        <div className="grid shadow-xl p-4 border rounded-custom dark:bg-[#191919] bg-[#FDFDFB]">
          <Typography variant="h5" className="pb-3 text-black dark:text-white">
            Downloadable Resources
          </Typography>
          <ul className="text-sm text-black dark:text-[#949494] leading-relaxed space-y-2">
            <li>
              <a href="#" className="text-blue-500 hover:underline">
                Beginner\'s Guide to Carbon Credits (PDF)
              </a>
            </li>
            <li>
              <a href="#" className="text-blue-500 hover:underline">
                Understanding Carbon Markets (PDF)
              </a>
            </li>
            <li>
              <a href="#" className="text-blue-500 hover:underline">
                Annual Carbon Credit Report (2023) (PDF)
              </a>
            </li>
            <li>
              <a href="#" className="text-blue-500 hover:underline">
                Glossary of Carbon Terms (PDF)
              </a>
            </li>
            <li>
              <a href="#" className="text-blue-500 hover:underline">
                Case Studies: Successful Carbon Reduction Projects (PDF)
              </a>
            </li>
          </ul>
        </div>

        <div className="grid shadow-xl p-4 border rounded-custom dark:bg-[#191919] bg-[#FDFDFB]">
          <Typography variant="h5" className="pb-3 text-black dark:text-white">
            Frequently Asked Questions (FAQs)
          </Typography>
          <div className="space-y-2">
            {faqs.map((faq, index) => (
              <Accordion key={index} title={faq.question}>
                <p>{faq.answer}</p>
              </Accordion>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Help;
