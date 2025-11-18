export function TransparencySection() {
  return (
    <section className="bg-custom-gray text-white py-[clamp(80px,12vw,150px)] px-[clamp(20px,4vw,50px)]">
      <div className="max-w-[1000px] mx-auto">
        <h2 className="font-bold leading-[1.6] mb-[clamp(40px,6vw,80px)] text-[clamp(36px,5vw,72px)]">
          We built this because<br />
          content teams are tired.
        </h2>

        <div className="space-y-6 leading-[1.8] mb-[clamp(40px,6vw,80px)] text-[clamp(20px,2.5vw,32px)]">
          <p>Tired of copy-pasting.</p>
          <p>Tired of chasing assets.</p>
          <p>Tired of missed deadlines.</p>
        </div>

        <div className="leading-[1.8] opacity-80 text-[clamp(18px,2vw,28px)]">
          <p className="mb-4">This isn't magic.</p>
          <p className="mb-8">It's just smarter orchestration.</p>

          <p className="text-[clamp(16px,1.8vw,20px)]">
            Built with IBM watsonx Orchestrate<br />
            for teams who want their time back.
          </p>
        </div>
      </div>
    </section>
  )
}
