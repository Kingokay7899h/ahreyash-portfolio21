import HeroSection from '@/components/HeroSection'
import SkillsConstellation from '@/components/SkillsConstellation'
import ExperienceJourney from '@/components/ExperienceJourney'
import ProjectsShowcase from '@/components/ProjectsShowcase'
import CertificatesGallery from '@/components/CertificatesGallery'
import ContactSection from '@/components/ContactSection'

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <section id="skills">
        <SkillsConstellation />
      </section>
      <section id="experience">
        <ExperienceJourney />
      </section>
      <section id="projects">
        <ProjectsShowcase />
      </section>
      <section id="certificates">
        <CertificatesGallery />
      </section>
      <section id="contact">
        <ContactSection />
      </section>
    </main>
  )
}