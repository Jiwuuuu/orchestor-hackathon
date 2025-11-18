export function Footer() {
  return (
    <footer className="bg-custom-dark text-white py-10 px-[clamp(20px,4vw,50px)] border-t border-gray-700">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center text-[clamp(12px,1.5vw,14px)] opacity-60">
        <div>
          ORCHESTOR<br />
          © 2025
        </div>

        <div className="text-center">
          Built for Agentic AI Hackathon<br />
          Powered by IBM watsonx Orchestrate
        </div>

        <div className="flex gap-6">
          <a href="#" className="hover:opacity-100 transition-opacity">
            GitHub
          </a>
          <a href="#" className="hover:opacity-100 transition-opacity">
            Demo Video
          </a>
          <a href="#" className="hover:opacity-100 transition-opacity">
            Contact
          </a>
        </div>
      </div>
    </footer>
  )
}
