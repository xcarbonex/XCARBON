import React from "react";
import { Typography, Accordion, Breadcrumb, Card } from "@/components";
import { IoHelpCircleOutline, IoDownloadOutline, IoDocumentTextOutline, IoSparkles } from "react-icons/io5";
import { FaLeaf, FaRecycle, FaChartLine } from "react-icons/fa";

interface BreadcrumbItem {
  label: string;
  path: string;
}

interface FAQ {
  question: string;
  answer: string;
}

const Help: React.FC = () => {
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Home", path: "/" },
    { label: "Help", path: "/help" },
  ];

  const faqs: FAQ[] = [
    {
      question: "What is the difference between compliance and voluntary carbon markets?",
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
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-accent-50/30 dark:from-neutral-950 dark:via-neutral-900 dark:to-accent-950/20 transition-all duration-slow">
      <div className="space-y-8">
        {/* Premium Header */}
        <div className="flex items-center gap-4 p-6 rounded-2xl bg-white dark:bg-neutral-900 border-2 border-success-200 dark:border-success-800 shadow-lg">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-success-500 to-success-600 shadow-lg shadow-success-500/30">
            <IoHelpCircleOutline className="w-7 h-7 text-white" />
          </div>
          <div>
            <Typography variant="h4" className="text-neutral-900 dark:text-white font-bold">
              Help & Support
            </Typography>
            <span className="text-sm text-neutral-600 dark:text-neutral-400 font-medium">
              Everything you need to know about carbon credits
            </span>
          </div>
        </div>
        
        <Breadcrumb items={breadcrumbItems} />

        {/* Premium Content Card - What are Carbon Credits */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-success-500/20 to-eco-leaf/20 rounded-2xl blur-xl opacity-50" />
          
          <Card className="relative border-2 border-success-200 dark:border-success-800 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-xl bg-gradient-to-br from-success-100 to-success-200 dark:from-success-900/30 dark:to-success-800/30">
                <FaLeaf className="w-6 h-6 text-success-700 dark:text-success-400" />
              </div>
              <Typography variant="h5" className="text-neutral-900 dark:text-white font-bold">
                What are Carbon Credits?
              </Typography>
            </div>
            <div className="flex flex-col md:flex-row items-start gap-5">
              <p className="text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
                Carbon credits are measurable, verifiable permits that allow the owner to emit one
                tonne of carbon dioxide (CO2e) equivalent from a specified project. They are used to
                offset greenhouse gas emissions and are a key tool in mitigating climate change.
                Projects that reduce, remove, or avoid greenhouse gas emissions can generate carbon
                credits. These can include initiatives in renewable energy, energy efficiency,
                reforestation, sustainable agriculture, and waste management.
                <br />
                <br />
                The goal of carbon credits is to create a market-based system that incentivizes
                emissions reductions. By attaching a monetary value to carbon emissions, companies and
                individuals are encouraged to invest in cleaner technologies and practices. This
                system helps facilitate the transition to a low-carbon economy, promoting sustainable
                development and environmental stewardship.
              </p>
            </div>
          </Card>
        </div>

        {/* Premium Content Card - How to Use */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-info-500/20 to-brand-500/20 rounded-2xl blur-xl opacity-50" />
          
          <Card className="relative border-2 border-info-200 dark:border-info-800 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-xl bg-gradient-to-br from-info-100 to-info-200 dark:from-info-900/30 dark:to-info-800/30">
                <FaRecycle className="w-6 h-6 text-info-700 dark:text-info-400" />
              </div>
              <Typography variant="h5" className="text-neutral-900 dark:text-white font-bold">
                How to Use Carbon Credits?
              </Typography>
            </div>
            <p className="text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
              Carbon credits can be bought and sold on various markets, including compliance markets
              (where emission reductions are legally mandated) and voluntary markets (where entities
              voluntarily offset their emissions). Companies that exceed their emission targets can
              purchase credits from those who have reduced their emissions below their targets. This
              flexibility allows for cost-effective emission reductions across different sectors.
              <br />
              <br />
              Typically, carbon credits are used by corporations to meet compliance obligations set by
              regulatory bodies or as part of voluntary commitments to reduce their carbon footprint.
              Individuals can also purchase carbon credits to offset their personal emissions,
              contributing to global sustainability efforts. It's crucial to ensure that the carbon
              credits purchased are from reputable projects that deliver genuine and additional
              emission reductions. Due diligence on the project's methodology, additionality, and
              permanence is essential.
            </p>
          </Card>
        </div>

        {/* Premium Content Card - Ecosystem */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-brand-500/20 to-accent-500/20 rounded-2xl blur-xl opacity-50" />
          
          <Card className="relative border-2 border-brand-200 dark:border-brand-800 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-xl bg-gradient-to-br from-brand-100 to-brand-200 dark:from-brand-900/30 dark:to-brand-800/30">
                <FaChartLine className="w-6 h-6 text-brand-700 dark:text-brand-400" />
              </div>
              <Typography variant="h5" className="text-neutral-900 dark:text-white font-bold">
                The Carbon Credit Ecosystem
              </Typography>
            </div>
            <div className="flex flex-col md:flex-row items-start gap-5">
              <p className="text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
                The carbon credit ecosystem involves several key players: project developers who
                implement emission reduction projects, verification bodies that ensure the projects
                meet established standards, registries that track and issue carbon credits, and buyers
                (companies or individuals) who purchase these credits to offset their emissions. This
                interconnected system facilitates the flow of credits from creation to retirement.
                <br />
                <br />
                Technological advancements, such as blockchain, are increasingly being integrated into
                this ecosystem to enhance transparency, traceability, and efficiency in the issuance
                and trading of carbon credits. This helps to build trust and integrity in the market,
                ensuring that each credit represents a verified and unique reduction in greenhouse gas
                emissions.
              </p>
            </div>
          </Card>
        </div>

        {/* Premium Content Card - Lifecycle */}
        <Card className="border-2 border-warning-200 dark:border-warning-800 shadow-xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-xl bg-gradient-to-br from-warning-100 to-warning-200 dark:from-warning-900/30 dark:to-warning-800/30">
              <IoSparkles className="w-6 h-6 text-warning-700 dark:text-warning-400" />
            </div>
            <Typography variant="h5" className="text-neutral-900 dark:text-white font-bold">
              The Carbon Credit Project Lifecycle
            </Typography>
          </div>
          <div className="flex flex-col md:flex-row items-start gap-5">
            <div className="text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
              The generation and use of carbon credits follow a structured lifecycle:
              <ul className="mt-4 space-y-3">
                <li className="flex items-start gap-2">
                  <span className="text-warning-600 dark:text-warning-400">•</span>
                  <span><b className="text-neutral-900 dark:text-white">Project Development:</b> Identifying and designing projects that reduce or
                  remove greenhouse gas emissions (e.g., renewable energy, reforestation).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-warning-600 dark:text-warning-400">•</span>
                  <span><b className="text-neutral-900 dark:text-white">Validation:</b> Independent third-party assessment to ensure the project meets
                  a recognized carbon standard and its methodologies are sound.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-warning-600 dark:text-warning-400">•</span>
                  <span><b className="text-neutral-900 dark:text-white">Monitoring:</b> Continuous measurement and reporting of actual emission
                  reductions achieved by the project.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-warning-600 dark:text-warning-400">•</span>
                  <span><b className="text-neutral-900 dark:text-white">Verification:</b> Another independent third-party audit to confirm the reported
                  emission reductions are accurate and meet the standard's requirements.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-warning-600 dark:text-warning-400">•</span>
                  <span><b className="text-neutral-900 dark:text-white">Issuance:</b> Once verified, carbon credits are issued by a registry, each
                  representing one tonne of CO2e reduced or removed.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-warning-600 dark:text-warning-400">•</span>
                  <span><b className="text-neutral-900 dark:text-white">Trading:</b> Credits can be bought and sold on compliance or voluntary markets.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-warning-600 dark:text-warning-400">•</span>
                  <span><b className="text-neutral-900 dark:text-white">Retirement:</b> Credits are permanently removed from circulation once used to
                  offset emissions, preventing double-counting.</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Premium Content Card - Benefits */}
        <Card className="border-2 border-success-200 dark:border-success-800 shadow-xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-xl bg-gradient-to-br from-success-100 to-success-200 dark:from-success-900/30 dark:to-success-800/30">
              <FaLeaf className="w-6 h-6 text-success-700 dark:text-success-400" />
            </div>
            <Typography variant="h5" className="text-neutral-900 dark:text-white font-bold">
              Benefits of Carbon Credits
            </Typography>
          </div>
          <ul className="text-base text-neutral-700 dark:text-neutral-300 leading-relaxed space-y-3">
            <li className="flex items-start gap-2">
              <span className="text-success-600 dark:text-success-400">✓</span>
              <span><b className="text-neutral-900 dark:text-white">Environmental Impact:</b> Directly contributes to the reduction of global
              greenhouse gas emissions, combating climate change.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success-600 dark:text-success-400">✓</span>
              <span><b className="text-neutral-900 dark:text-white">Economic Incentives:</b> Provides financial incentives for businesses and
              organizations to adopt sustainable practices and invest in green technologies.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success-600 dark:text-success-400">✓</span>
              <span><b className="text-neutral-900 dark:text-white">Sustainable Development:</b> Supports projects that often have co-benefits such as
              biodiversity conservation, improved public health, and job creation in local
              communities.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success-600 dark:text-success-400">✓</span>
              <span><b className="text-neutral-900 dark:text-white">Regulatory Compliance:</b> Helps companies meet mandatory emission reduction
              targets imposed by governments and international agreements.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success-600 dark:text-success-400">✓</span>
              <span><b className="text-neutral-900 dark:text-white">Enhanced Reputation:</b> Improves corporate image and demonstrates a commitment to
              environmental stewardship, appealing to conscious consumers and investors.</span>
            </li>
          </ul>
        </Card>

        {/* Premium Content Card - Challenges */}
        <Card className="border-2 border-info-200 dark:border-info-800 shadow-xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-xl bg-gradient-to-br from-info-100 to-info-200 dark:from-info-900/30 dark:to-info-800/30">
              <FaChartLine className="w-6 h-6 text-info-700 dark:text-info-400" />
            </div>
            <Typography variant="h5" className="text-neutral-900 dark:text-white font-bold">
              Challenges and Future of Carbon Markets
            </Typography>
          </div>
          <p className="text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
            Despite their potential, carbon markets face challenges such as ensuring the integrity
            and additionality of credits, preventing double-counting, and managing price volatility.
            The future of carbon markets is likely to involve increased standardization, greater
            transparency through advanced technologies like blockchain, and the expansion of market
            mechanisms to include more sectors and regions. There's a growing emphasis on
            high-quality, nature-based solutions and direct air capture technologies to further
            accelerate decarbonization efforts.
          </p>
        </Card>

        {/* Premium Content Card - Resources */}
        <Card className="border-2 border-brand-200 dark:border-brand-800 shadow-xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-xl bg-gradient-to-br from-brand-100 to-brand-200 dark:from-brand-900/30 dark:to-brand-800/30 shadow-lg shadow-brand-500/30">
              <IoDownloadOutline className="w-6 h-6 text-brand-700 dark:text-brand-400" />
            </div>
            <Typography variant="h5" className="text-neutral-900 dark:text-white font-bold">
              Downloadable Resources
            </Typography>
          </div>
          <div className="flex flex-col space-y-3">
            <a
              href="#"
              className="group flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-neutral-50 to-neutral-100 dark:from-neutral-800 dark:to-neutral-900 hover:from-brand-50 hover:to-accent-50 dark:hover:from-brand-950/30 dark:hover:to-accent-950/30 transition-all duration-300 border border-neutral-200 dark:border-neutral-700"
            >
              <div className="p-2 rounded-lg bg-white dark:bg-neutral-800 shadow-sm">
                <IoDocumentTextOutline className="w-5 h-5 text-brand-600 dark:text-brand-400" />
              </div>
              <span className="text-base font-medium text-neutral-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                Beginner's Guide to Carbon Credits (PDF)
              </span>
            </a>
            <a
              href="#"
              className="group flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-neutral-50 to-neutral-100 dark:from-neutral-800 dark:to-neutral-900 hover:from-brand-50 hover:to-accent-50 dark:hover:from-brand-950/30 dark:hover:to-accent-950/30 transition-all duration-300 border border-neutral-200 dark:border-neutral-700"
            >
              <div className="p-2 rounded-lg bg-white dark:bg-neutral-800 shadow-sm">
                <IoDocumentTextOutline className="w-5 h-5 text-brand-600 dark:text-brand-400" />
              </div>
              <span className="text-base font-medium text-neutral-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                Understanding Carbon Markets (PDF)
              </span>
            </a>
            <a
              href="#"
              className="group flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-neutral-50 to-neutral-100 dark:from-neutral-800 dark:to-neutral-900 hover:from-brand-50 hover:to-accent-50 dark:hover:from-brand-950/30 dark:hover:to-accent-950/30 transition-all duration-300 border border-neutral-200 dark:border-neutral-700"
            >
              <div className="p-2 rounded-lg bg-white dark:bg-neutral-800 shadow-sm">
                <IoDocumentTextOutline className="w-5 h-5 text-brand-600 dark:text-brand-400" />
              </div>
              <span className="text-base font-medium text-neutral-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                Annual Carbon Credit Report (2023) (PDF)
              </span>
            </a>
            <a
              href="#"
              className="group flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-neutral-50 to-neutral-100 dark:from-neutral-800 dark:to-neutral-900 hover:from-brand-50 hover:to-accent-50 dark:hover:from-brand-950/30 dark:hover:to-accent-950/30 transition-all duration-300 border border-neutral-200 dark:border-neutral-700"
            >
              <div className="p-2 rounded-lg bg-white dark:bg-neutral-800 shadow-sm">
                <IoDocumentTextOutline className="w-5 h-5 text-brand-600 dark:text-brand-400" />
              </div>
              <span className="text-base font-medium text-neutral-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                Glossary of Carbon Terms (PDF)
              </span>
            </a>
            <a
              href="#"
              className="group flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-neutral-50 to-neutral-100 dark:from-neutral-800 dark:to-neutral-900 hover:from-brand-50 hover:to-accent-50 dark:hover:from-brand-950/30 dark:hover:to-accent-950/30 transition-all duration-300 border border-neutral-200 dark:border-neutral-700"
            >
              <div className="p-2 rounded-lg bg-white dark:bg-neutral-800 shadow-sm">
                <IoDocumentTextOutline className="w-5 h-5 text-brand-600 dark:text-brand-400" />
              </div>
              <span className="text-base font-medium text-neutral-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                Case Studies: Successful Carbon Reduction Projects (PDF)
              </span>
            </a>
          </div>
        </Card>

        {/* Premium Content Card - FAQ */}
        <Card className="border-2 border-info-200 dark:border-info-800 shadow-xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-xl bg-gradient-to-br from-info-100 to-info-200 dark:from-info-900/30 dark:to-info-800/30 shadow-lg shadow-info-500/30">
              <IoHelpCircleOutline className="w-6 h-6 text-info-700 dark:text-info-400" />
            </div>
            <Typography variant="h5" className="text-neutral-900 dark:text-white font-bold">
              Frequently Asked Questions (FAQs)
            </Typography>
          </div>
          <div className="space-y-2">
            {faqs.map((faq, index) => (
              <Accordion key={index} title={faq.question}>
                <p>{faq.answer}</p>
              </Accordion>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Help;
