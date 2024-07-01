<script setup lang="ts">
import Card from 'primevue/card'
import ViewLayout from '@/components/ViewLayout.vue';
</script>

<template>
  <ViewLayout window-title="About the about" view-title="All about the about" icon="iconify mdi--information-slab-circle">
    <Card>
      <template #title>About the about</template>
      <template #content>
        <div class="flex flex-col gap-4">
          <p>
            <strong>About pages</strong> on websites serve as a critical window into the heart and soul of a website, offering visitors a glimpse into the mission, vision, and
            values
            that drive the
            organization or individual behind it.
          </p>
          <p>
            These pages often tell a story, weaving together the history, achievements, and aspirations that define the entity, providing a personal touch that helps to build trust
            and connection with the audience.
          </p>
          <p>
            Whether it's a detailed account of the journey that led to the creation of the website, an
            introduction to the team making it all happen, or a manifesto of the principles guiding their work, an about page is a space where authenticity shines, inviting users
            to
            understand not just what you do, but why you do it.
          </p>
        </div>
      </template>
    </Card>

    <Card>
      <template #title>The Team</template>
      <template #content>
        <p>
          Behind every successful project is a dedicated team, and ours is no exception. Meet the trio driving our vision forward, each with a unique blend of passion for web
          technology, data, and a peculiar love for fruits:
        </p>
        <br>
        <ul class="list-disc flex flex-col pl-6 gap-4 text-pretty">
          <li>
            <strong>Alex:</strong> The visionary leader and strategist, Alex brings a wealth of experience and an unyielding passion for innovation. With a keen eye for detail and
            a deep understanding of our industry, Alex guides the team towards new heights. Alex is particularly fascinated by the challenges and opportunities in implementing
            efficient pagination and filtering in web applications, ensuring users have a seamless experience. Also, Alex has a soft spot for bananas, finding their energy-boosting
            properties perfect for marathon brainstorming sessions.
          </li>
          <li>
            <strong>Nicole:</strong> Our technical wizard, Sam, is the genius behind our cutting-edge solutions. With a knack for solving complex problems with elegant code, Sam
            ensures our projects are not just functional but also ahead of the curve. Sam's recent focus has been on optimizing data handling and retrieval techniques, making our
            applications faster and more responsive. When not coding, Sam enjoys experimenting with pineapple recipes, believing in its power to spark creativity.
          </li>
          <li>
            <strong>Jordan:</strong> The creative force of the team, Jordan's designs breathe life into our projects. Combining aesthetic appeal with user-friendly interfaces,
            Jordan makes sure our work is not just effective but also visually captivating. Jordan is currently exploring how to integrate intuitive pagination and filtering
            options into our designs, enhancing user engagement. Jordan's love for both bananas and pineapples is well-known, often leading to lively debates about which fruit is
            the superior snack.
          </li>
        </ul>
      </template>
    </Card>
  </ViewLayout>
</template>