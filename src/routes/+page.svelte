<script lang="ts">
    import { onMount, onDestroy, tick } from 'svelte';
    import MusicPlayer from "$lib/components/MusicPlayer.svelte";
    import { create_term, interpret_command, type Terminal } from "$lib/types/terminal.js";


    let term_output = `
        # Welcome to in_outer_space; a blog about cybersec/programming/music/life/whatever
        
        To navigate the website use the following commands:
        * ls - list the pages on this website
        * cd <page> - goto the specified page
        
   
        
    `;

    const names = [
        "lajka",
        "case",
        "molly",
        "armitage",
        "finn",
        "flatline",
        "riviera",
        "lady3jane",
        "ashpool",
        "wintermute",
        "neuromancer",
        "julius",
        "hideo",
        "maelcum",
        "linda",
        "newmark",
        "turner",
        "kruskhova",
        "virek",
        "yanaka",
        "henry",
        "mitchell"
    ];

    let name = $state(names[0]);
    let prompt_input = "ls";
    let name_id = 0;
    let user_input = $derived("[" + name + "@in_outer_space ~]$ ls");
    function change_name() {
        name = names[(name_id + ++name_id) % names.length];
    }
    let interval: ReturnType<typeof setInterval>;
    onMount(() => {
        interval = setInterval(change_name, 5000); // run every 1000ms (1 second)
        term_enter();
    });

    onDestroy(() => {
        clearInterval(interval); // clean up when component is removed
    });

    const term_enter = (): void => {
        term_output += user_input + "\n\n" + interpret_command(term, prompt_input) + "\n\n";
        user_input = user_input.slice(0, user_input.length - prompt_input.length);
        prompt_input = ""
    }

    const term: Terminal = create_term();
    function handleKey(event: KeyboardEvent) {
        if (event.key === 'Enter') {
            term_enter();
        } else if (event.key === 'Delete' || event.key === 'Backspace') {
            if (prompt_input.length > 0) {
                user_input = user_input.slice(0, user_input.length-1);
                prompt_input = prompt_input.slice(0, prompt_input.length-1);
            }
        }
        else {
            prompt_input += event.key;
            user_input += event.key;
        }
    }

</script>


<h1 id="title">
    in_outer_space/<span id="where_at">home</span>
</h1>
    <img src="/images/deamon.jpg" alt="TODO" id="intro_image">

<svelte:window on:keydown={handleKey} />
<div id="layout">
    <div id="term_nav">
        <div class="term_output" style="white-space: pre;">
            <p style="white-space: pre-line;">{term_output}</p>
        </div>
        <div id="prompt_div">
            <div id="prompt_div_left">
                <p id="term_prompt">
                    {user_input}
                </p>
            </div>
        </div>
    </div>
</div>


<style>


    #title {
        font-size: 25pt;
        position: absolute;
        color: white;
        font-family: "Montserrat", sans-serif;
        margin-left: 30px;
        z-index: 10;
    }

    #intro_image {
        width: 400px;
        height: 400px;
        position: absolute;
        z-index: 0;
    }

    #light_mode {
        position: absolute;
        color: white;
        right: 30px;
    }

    #layout {
        display: grid;
        place-items: center;
        height: 100vh;
        width: 100vw;
    }

    #term_nav {
        position: absolute;
        padding-top: 10px;
        padding-left: 30px;
        height: 700px;
        width: 1000px;

    }

    #prompt_div {
        display: flex;
        align-items: center;
        justify-content: left;
    }

    #prompt_div_left {
        display: flex;
        align-items: center;
        width: fit-content;
        font-size: 17pt;
        height:fit-content;
        margin-top: -50px;
    }

    #term_prompt {
        color: white;
    }

    #prompt_div_left::after {
        color: white;
        content: "_";
        animation: blink 1s steps(1) infinite;
    }

    @keyframes blink {
        0%, 50% { opacity: 1; }
        50.01%, 100% { opacity: 0; }
    }

    #where_at {
        color: #A490F4;
    }

    .term_output {
        font-size: 17pt;
        color: white;
        white-space: pre;     
    }


</style>

<MusicPlayer />
