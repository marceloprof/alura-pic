export default {
    bind(el, binding, vnode){
      let current = 0;
      let evento;
      el.addEventListener('dblclick', function () {
          if(!binding.arg || binding.arg == 'rotate'){
            current += binding.value;
            evento = `rotate(${current}deg)`;
          }else if(binding.arg == 'scale'){
            evento = `scale(${binding.value})`;
          }

          el.style.transform = evento;

          if(binding.modifiers.animate){
            el.style.transition = `transform 0.5s`;
          }

        });
    }
}
