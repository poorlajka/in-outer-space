<script lang="ts">
	let audio: HTMLAudioElement;
	let isPlaying = false;
	let progress = 0;
    let isScrubbing = false;

	const src = "/music/burn5.mp3"; 
	const title = "burn";

	function togglePlay() {
		if (!audio) return;
		if (isPlaying) {
			audio.pause();
		} else {
			audio.play();
		}
		isPlaying = !isPlaying;
	}

    function updateProgress() {
		// Only update when not actively scrubbing
		if (isScrubbing || !audio || !audio.duration) return;
		progress = (audio.currentTime / audio.duration) * 100;
	}

    function scrubTo(event: MouseEvent) {
		if (!audio || !audio.duration) return;
		const bar = event.currentTarget as HTMLDivElement;
		const rect = bar.getBoundingClientRect();
		const percent = ((event.clientX - rect.left) / rect.width) * 100;
		progress = Math.min(Math.max(percent, 0), 100);
		audio.currentTime = (progress / 100) * audio.duration;
	}

	function startScrub(event: MouseEvent) {
		isScrubbing = true;
		scrubTo(event);
		window.addEventListener("mousemove", scrubTo);
		window.addEventListener("mouseup", endScrub);
	}

	function endScrub(event: MouseEvent) {
		isScrubbing = false;
		scrubTo(event);
		window.removeEventListener("mousemove", scrubTo);
		window.removeEventListener("mouseup", endScrub);
	}
</script>

<div class="player">
	<button on:click={togglePlay}>
		{isPlaying ? "⏸" : "▶"}
	</button>

	<div class="info">
		<p class="title">{title}</p>
		<div class="progress"
                role="slider"
                tabindex="0"
                aria-label="Seek bar"
                aria-valuemin="0"
                aria-valuemax="100"
                aria-valuenow={progress}
                on:mousedown={startScrub}
        >
			<div class="bar" 
                style="width: {progress}%"></div>
		</div>
	</div>

	<audio
		bind:this={audio}
		src={src}
		on:timeupdate={updateProgress}
		on:ended={() => (isPlaying = false)}
	></audio>
</div>

<style>
	.player {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 97%;
		background: black;
		display: flex;
        z-index: 5;
		align-items: center;
		gap: 1rem;
		padding: 0.75rem 1rem;
		color: white;
		font-family: sans-serif;
		box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.3);
	}

	button {
		background: none;
		border: none;
		color: white;
		font-size: 1.5rem;
		cursor: pointer;
	}

	.info {
		flex: 1;
	}

	.title {
		margin: 0;
		font-size: 0.9rem;
	}

	.progress {
		height: 10px;
		background: #333;
		border-radius: 2px;
		overflow: hidden;
	}

	.bar {
		height: 100%;
		background: white;
		transition: width 0.1s linear;
	}
</style>