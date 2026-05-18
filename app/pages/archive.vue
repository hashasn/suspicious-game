<template>
  <main class="min-h-screen bg-[#FFFFD0] text-black px-5 py-10">
    <section class="max-w-6xl mx-auto">
      <NuxtLink
        to="/"
        class="inline-flex items-center gap-2 border-2 border-black bg-white px-4 py-2 font-black uppercase shadow-[4px_4px_0px_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#000] transition mb-6"
      >
        ← Back Home
      </NuxtLink>

      <div
        class="border-2 border-black bg-[#FFF8B8] p-6 md:p-10 shadow-[10px_10px_0px_#000] mb-8"
      >
        <p class="text-[#A555EC] font-black uppercase mb-2">Case Archive</p>

        <h1 class="text-4xl md:text-6xl font-black leading-none mb-4">
          Past Investigations
        </h1>

        <p class="text-neutral-700 max-w-2xl font-medium">
          Revisit previous daily cases and test whether you can still spot the
          AI-generated image.
        </p>
      </div>

      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <NuxtLink
          v-for="caseFile in allCases"
          :key="caseFile.id"
          :to="`/play/${caseFile.id}`"
          class="group block border-2 border-black bg-white p-5 shadow-[5px_5px_0px_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#000] transition"
        >
          <div class="flex justify-between items-start gap-4 mb-6">
            <p class="font-black text-[#A555EC] uppercase">
              Case No. {{ caseFile.id.toString().padStart(3, "0") }}
            </p>

            <p
              class="text-xs font-black border-2 border-black px-3 py-1 bg-[#FFFFD0]"
            >
              {{ caseFile.rounds.length }} rounds
            </p>
          </div>

          <h2 class="text-2xl font-black mb-3 leading-tight">
            {{ caseFile.title }}
          </h2>

          <p class="text-neutral-600 font-bold mb-6">
            {{ caseFile.date }}
          </p>

          <div class="h-2 border-2 border-black bg-[#FFFFD0] mb-5">
            <div class="h-full bg-[#A555EC] w-full"></div>
          </div>

          <p class="font-black uppercase group-hover:translate-x-1 transition">
            Open Case →
          </p>
        </NuxtLink>
      </div>
    </section>
  </main>
</template>

<script setup>
const { allCases } = useCases();
</script>
