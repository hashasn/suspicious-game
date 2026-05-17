<template>
  <main
    class="min-h-screen bg-[#FFFFD0] text-black flex items-center justify-center px-5 py-10 overflow-hidden"
  >
    <section
      class="relative w-full max-w-6xl border-2 border-black bg-[#FFF8B8] px-6 py-10 md:px-14 md:py-16 shadow-[12px_12px_0px_#000]"
    >
      <!-- Top labels -->
      <div
        class="absolute -top-5 left-6 md:left-10 bg-[#A555EC] text-white px-5 py-2 border-2 border-black rotate-[-3deg] font-black uppercase shadow-[4px_4px_0px_#000]"
      >
        Daily Case File
      </div>

      <div
        class="absolute top-6 right-6 hidden md:block border-2 border-black bg-white px-4 py-2 rotate-[4deg] text-sm font-black shadow-[3px_3px_0px_#000]"
      >
        Case No. 001
      </div>

      <div class="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 items-center">
        <!-- Left content -->
        <div class="text-center lg:text-left">
          <p
            class="text-[#A555EC] text-5xl md:text-8xl font-black uppercase tracking-tighter mb-5"
          >
            suspicious
          </p>

          <div class="mx-auto lg:mx-0 mb-8 h-1 w-32 bg-black"></div>

          <h1 class="text-4xl md:text-6xl font-black tracking-tight mb-6">
            Today’s case is open.
          </h1>

          <p
            class="max-w-xl mx-auto lg:mx-0 text-neutral-700 text-base md:text-lg mb-8"
          >
            A new image investigation drops every day. Study the evidence,
            choose the AI-generated image, and see if you can keep your streak
            alive.
          </p>

          <div
            class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            <NuxtLink
              to="/play"
              class="inline-flex items-center justify-center border-2 border-black bg-black text-white px-9 py-4 font-black uppercase shadow-[6px_6px_0px_#A555EC] hover:translate-x-1 hover:translate-y-1 hover:shadow-[3px_3px_0px_#A555EC] transition"
            >
              Start Today’s Case
            </NuxtLink>
          </div>

          <p
            class="mt-6 text-xs md:text-sm font-black uppercase tracking-widest text-neutral-600"
          >
            One case per day • Build your streak • Share your result
          </p>
        </div>

        <!-- Evidence preview -->
        <div class="relative">
          <div
            class="absolute -top-5 -left-5 bg-[#A555EC] text-white border-2 border-black px-4 py-2 font-black rotate-[-5deg] z-10 shadow-[3px_3px_0px_#000]"
          >
            Evidence
          </div>

          <div
            class="border-2 border-black bg-white p-4 shadow-[10px_10px_0px_#000] rotate-[2deg]"
          >
            <div class="grid grid-cols-2 gap-3">
              <div class="border-2 border-black bg-[#FFFFD0] p-3">
                <img
                  src="/train_real.avif"
                  alt="Evidence image A"
                  class="h-44 md:h-64 w-full bg-neutral-400 border-2 border-black object-cover"
                />
                <p class="mt-3 font-black uppercase">Image A</p>
              </div>

              <div class="border-2 border-black bg-[#FFFFD0] p-3 relative">
                <img
                  src="/train_ai.png"
                  alt="Evidence image B"
                  class="h-44 md:h-64 w-full bg-neutral-400 border-2 border-black object-cover"
                />

                <p class="mt-3 font-black uppercase">Image B</p>

                <div
                  class="absolute top-5 left-5 bg-red-500 text-white border-2 border-black px-3 py-1 text-xs font-black rotate-[-4deg] shadow-[2px_2px_0px_#000]"
                >
                  Suspect?
                </div>
              </div>
            </div>

            <div
              class="mt-4 border-t-2 border-black pt-4 text-sm text-neutral-700"
            >
              <p class="font-black text-black uppercase">Case Note</p>
              <p>
                Look for warped details, strange textures, fake lighting, messy
                hands, broken text, and reflections that feel too perfect.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer meta -->
      <div
        class="mt-12 flex flex-col md:flex-row gap-2 md:gap-5 items-center justify-center text-sm text-neutral-600 border-t-2 border-black pt-5"
      >
        <NuxtTime
          :datetime="Date.now()"
          month="long"
          day="numeric"
          year="numeric"
        />

        <span class="hidden md:inline">•</span>

        <p>Case No. 001</p>

        <span class="hidden md:inline">•</span>

        <p>Daily AI image investigation</p>
      </div>
    </section>
  </main>
</template>
