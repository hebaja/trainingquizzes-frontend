<template>
	<b-row>
		<b-col cols="12" class="mx-auto d-none d-md-none d-lg-block">
			<table class="table">
				<thead>
					<tr>
						<th>Subject</th>
						<th>Author</th>
						<th>Level</th>
						<th>Average</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="average in averages" :key="average.uid">
						<td>{{ average.subjectTitle }}</td>
						<td>{{ average.user.username }}</td>
						<td>{{ average.levelCapitalize }}</td>
						<td>
							<b-progress :max="100" height="1.8em"
							show-value>
								<b-progress-bar 
								:value="average.averageForMeter"
								:variant="
								average.averageForMeter <= 40 ? 'danger' :
								average.averageForMeter > 40 && average.averageForMeter < 80 ? 'warning' :
								'success'" 
								show-progress animated>
									<strong>
										<span id="average-text">{{ average.averageForMeter }}%</span>
									</strong>
								</b-progress-bar>
							</b-progress>
						</td>
					</tr>
				</tbody>
			</table>
		</b-col>
		<b-col cols="12" class="mx-auto d-md-block d-lg-none">
			<div v-for="average in averages" :key="average.uid" class="card mb-1 bg-light border-secondary shadow" style="height: 6.8em;">
				<div class="card-header">
					{{ average.subjectTitle }}
				</div>
				<div class="card-body">
					<h6 class="card-subtitle mb-1 text-muted">
						<b-row>
							<b-col>
								Level: {{ average.levelCapitalize }}
							</b-col>
							<b-col>
								Maker: {{ average.user.username }}
							</b-col>
						</b-row>
					</h6>
					<b-row>
						<b-col cols="3">
							Average:
						</b-col>
						<b-col cols="9" class="mt-1">
							<Gauge :score="average.averageForMeter"/>
						</b-col>
					</b-row>
				</div>
			</div>
		</b-col>
	</b-row>
</template>

<script>
import { mapGetters } from 'vuex'
import Gauge from '../Gauge.vue';

export default {
	name: 'averages-table-items',
	props: {
		averages: Array
	},
	components: {
		Gauge
	},
	computed: {
		...mapGetters(['storedUser'])
	}
}
</script>

<style>

</style>