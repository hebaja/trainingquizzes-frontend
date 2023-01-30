<template>
	<b-row class="mt-2">
		<b-col cols="12">
			<h1>Training Quizzes</h1>
			<h4 class="text-secondary">Assessing students' progress with constant practice</h4>
				<p>
					The purpose of Training Quizzes is to provide a plataform to help teachers assess their students' performances. 
					After being introduced to a new subject. It's important that students take constant practice for a while to consolidate
					the target knowledge. Training Quizzes facilitates the process, helping teacher to provide students constant quizzes with
					random tasks.
				</p>
			
		</b-col>
		<b-col cols="12" class="mb-2">
			<b-card title="1. Create a subject">
				<b-row>
					<b-col cols="12" xl="7" lg="6" class="mb-2">
						<b-card-text>
							After signing in, Go to subjects and create a new one. A subject must have a title and at least ten tasks (questions).
							Each task must contain between two and five options.
						</b-card-text>
					</b-col>
					<b-col>
						<b-img :src="require('../assets/subject.png')" fluid alt="creating a subject image"></b-img>
					</b-col>
				</b-row>
			</b-card>
		</b-col>
		<b-col cols="12" class="mb-2">
			<b-card title="2. Create a quest">
				<b-row>
					<b-col cols="12" xl="7" lg="6" class="mb-2">
						<b-card-text>
							Go to quests to make a new one. A quest can last between one day and one week. The teacher decides how long the quest
							is going to last and how many trials it will contain. Students who subscribe to quest will be notified about the trials in
							due time. A trial is a quis made of ten random tasks (questions). The scores will be recorded and can be viewed by teacher and 
							students.
						</b-card-text>
					</b-col>
					<b-col>
						<b-img :src="require('../assets/quest.png')" fluid alt="creating a quest image"></b-img>
					</b-col>
				</b-row>
			</b-card>
		</b-col>
		<b-col cols="12" class="mb-2">
			<b-card title="3. Students subscribe to quest">
				<b-row>
					<b-col cols="12" xl="7" lg="6" class="mb-2">
						<b-card-text>
							After saving the quest, a subscription link and code will be generated. Students can use either the link or the code
							to subscribe to quest.
						</b-card-text>
					</b-col>
					<b-col>
						<b-img :src="require('../assets/subscribe.png')" fluid alt="subscribing to quest image"></b-img>
					</b-col>
				</b-row>
			</b-card>
		</b-col>
		<b-col cols="12" class="mb-2">
			<b-card title="4. Students take the trials">
				<b-row>
					<b-col cols="12" xl="7" lg="6" class="mb-2">
						<b-card-text>
							Students subscribe to quest and can take the first trial. Other trials will be available in time. Students are to be
							notified by e-mail when the following trials are available.
						</b-card-text>
					</b-col>
					<b-col>
						<b-img :src="require('../assets/trial.png')" fluid alt="taking trials image"></b-img>
					</b-col>
				</b-row>
			</b-card>
		</b-col>
		<b-col cols="12" class="mb-2">
			<b-card title="5. End of quest">
				<b-row>
					<b-col cols="12" xl="7" lg="6" class="mb-2">
						<b-card-text>
							When the quest is through, everyone can check the final result.
						</b-card-text>
					</b-col>
					<b-col>
						<b-img :src="require('../assets/finish.png')" fluid alt="finish quest image"></b-img>
					</b-col>
				</b-row>
			</b-card>
		</b-col>
		<hr>
		<b-col class="container me-2 ms-2">
			<iframe class="responsive-iframe" src="https://www.youtube.com/embed/zMzpxCaYfCk?autoplay=0&fs=0&iv_load_policy=3&showinfo=0&rel=0&cc_load_policy=0&start=0&end=0&origin=http://youtubeembedcode.com"></iframe>
		</b-col>
	</b-row>
	
</template>

<script>
export default {
	name: 'how-it-works'

}
</script>

<style>
.container {
  position: relative;
  overflow: hidden;
  width: 100%;
  padding-top: 56.25%; /* 16:9 Aspect Ratio (divide 9 by 16 = 0.5625) */
}

/* Then style the iframe to fit in the container div with full height and width */
.responsive-iframe {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
}

</style>