<template>
    <div class="ingredients-modal d-block">
        <!-- Modal -->
        <div class="modal d-block show" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable" role="document">
                <div class="modal-content">
                    <!-- Modal Header -->
                    <div class="modal-header">
                        <h5 class="modal-title">Shopping List</h5>
                        <button type="button" class="close" @click="onCloseModal">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>

                    <!-- Modal Body -->
                    <div class="modal-body">
                        <ul>
                            <li v-for="ingredient of props.ingredientList">
                                {{ingredient.ingredient.name}}: {{ ingredient.ingredient.quantity }} {{ ingredient.ingredient.unit }} ({{ingredient.quantity}})
                            </li>
                        </ul>
                    </div>

                    <!-- Modal Footer -->
                    <div class="modal-footer">
                        <button type="button" class="btn" @click="copyToClipboard">
                            <i v-if="!textCopied" class="bi bi-copy"></i>
                            <i v-else class="bi bi-check-circle"></i>
                        </button>
                        <button type="button" class="btn btn-secondary" @click="onCloseModal">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { IngredientList } from '@/apps/restaurant/application/useCases/generateListOfIngredients';
import { ref } from 'vue';

const textCopied = ref<boolean>(false)

const emit = defineEmits([
    'modal:close'
])
const props = defineProps<{
    ingredientList: IngredientList[]
}>()

const onCloseModal = async () => {
    emit('modal:close')
}

function formatItemListToString(ingredients: IngredientList[]): string {
    let text: string = ""
    ingredients.forEach(ingredient => {
        text += `☐ ${ingredient.ingredient.name}: ${ ingredient.ingredient.quantity } ${ ingredient.ingredient.unit } (${ingredient.quantity})\n`;
    })
    return text;
}

const copyToClipboard = async () => {
   const itemListString = formatItemListToString(props.ingredientList)
  try {
    await navigator.clipboard.writeText(itemListString);
  } catch (err) {
    console.error('Failed to copy: ', err);
    alert('Failed to copy text.');
  }
  textCopied.value = true;
};

</script>
<style scoped>

.modal{
    /* bug fix - custom overlay */   
    background-color: rgba(10,10,10,0.45);
}
</style>