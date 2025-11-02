import { cn } from "../../../utils/cn";
import type { TabsProps } from "./Tabs.types";

const Tabs = ({ tabs, activeTab, onChange }: TabsProps) => {
  return (
    <div>
      <nav className=" flex space-x-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              "flex items-center cursor-pointer  gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors",
              activeTab === tab.id
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground hover:border-primary"
            )}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Tabs;
