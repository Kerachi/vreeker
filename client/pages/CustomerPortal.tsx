import CustomerPortalLayout from "@/components/CustomerPortalLayout";
import ProjectOverview from "@/components/ProjectOverview";
import DocumentsPhotos from "@/components/DocumentsPhotos";
import Communication from "@/components/Communication";
import UpcomingAppointments from "@/components/UpcomingAppointments";

const sampleProjects = [
  {
    id: "1",
    name: "Achtertuin Renovatie",
    address: "Kerkstraat 42, Utrecht",
    status: "in-progress" as const,
    completionDate: "15 december 2024",
  },
  {
    id: "2",
    name: "Voortuin Herinrichting",
    address: "Kerkstraat 42, Utrecht",
    status: "pending" as const,
    completionDate: "25 januari 2025",
  },
];

const sampleDocuments = [
  {
    id: "1",
    name: "Offerte Achtertuin Renovatie",
    type: "pdf" as const,
    size: "2.4 MB",
    uploadDate: "5 november 2024",
  },
  {
    id: "2",
    name: "Projectplan",
    type: "pdf" as const,
    size: "1.8 MB",
    uploadDate: "3 november 2024",
  },
  {
    id: "3",
    name: "Voortuin Foto 1",
    type: "image" as const,
    size: "3.2 MB",
    uploadDate: "4 november 2024",
  },
  {
    id: "4",
    name: "Voortuin Foto 2",
    type: "image" as const,
    size: "2.9 MB",
    uploadDate: "4 november 2024",
  },
  {
    id: "5",
    name: "Voortuin Foto 3",
    type: "image" as const,
    size: "3.5 MB",
    uploadDate: "4 november 2024",
  },
];

const sampleMessages = [
  {
    id: "1",
    author: "Peter van Dijk",
    role: "Projectleider",
    text: "Goedemorgen Sandra! De werkzaamheden aan uw achtertuin zijn goed op schema. We zullen volgende week verder gaan met de aanplant.",
    date: "Gisteren",
    isClient: false,
  },
  {
    id: "2",
    author: "Sandra",
    role: "Klant",
    text: "Dank u! Kunt u een foto maken van de huidige status?",
    date: "Vandaag",
    isClient: true,
  },
  {
    id: "3",
    author: "Peter van Dijk",
    role: "Projectleider",
    text: "Uiteraard! Ik stuur vandaag nog foto's. Ook zal ik u binnenkort een tussenstand email sturen.",
    date: "Vandaag",
    isClient: false,
  },
];

const sampleAppointments = [
  {
    id: "1",
    date: "4 november 2024",
    time: "09:00 - 12:00",
    title: "Onderhoud voortuin",
    description: "Controle en onderhoud van voortuin",
  },
  {
    id: "2",
    date: "8 november 2024",
    time: "14:00 - 16:00",
    title: "Gesprek projectvoortgang",
    description: "Besprekking voortgang achtertuin renovatie",
  },
];

export default function CustomerPortal() {
  return (
    <CustomerPortalLayout clientName="Sandra">
      <div className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <ProjectOverview projects={sampleProjects} />
            <DocumentsPhotos documents={sampleDocuments} />
          </div>

          <div className="space-y-8">
            <UpcomingAppointments appointments={sampleAppointments} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Communication
              projectLeader="Peter van Dijk"
              initialMessages={sampleMessages}
            />
          </div>
        </div>
      </div>
    </CustomerPortalLayout>
  );
}
