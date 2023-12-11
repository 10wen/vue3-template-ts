<script setup lang="ts">
import { ref, onBeforeMount } from "vue";
import CKEditor from "@ckeditor/ckeditor5-vue";
import type { EditorConfig } from "@ckeditor/ckeditor5-core/src/editor/editorconfig";

import { ClassicEditor } from "@ckeditor/ckeditor5-editor-classic";
import { Essentials } from "@ckeditor/ckeditor5-essentials";
import { Autoformat } from "@ckeditor/ckeditor5-autoformat";
import { Bold, Italic, Underline } from "@ckeditor/ckeditor5-basic-styles";
import { Indent } from "@ckeditor/ckeditor5-indent/src/index";
import { List } from "@ckeditor/ckeditor5-list";
import { Paragraph } from "@ckeditor/ckeditor5-paragraph";
import { Alignment } from "@ckeditor/ckeditor5-alignment";
import { Font } from "@ckeditor/ckeditor5-font";

import {
  Image,
  AutoImage,
  ImageCaption,
  ImageResize,
  ImageResizeEditing,
  ImageResizeHandles,
  ImageStyle,
  ImageToolbar,
  ImageUpload,
} from "@ckeditor/ckeditor5-image";
// import { MyCustomUploadAdapterPlugin } from "./uploadAdapter";


const props = withDefaults(
  defineProps<{
    modelValue: any;
    maxlength?: number;
    disabled?: boolean;
    toolbarConfig?: any;
    customConfig?: any;
  }>(),
  {
    modelValue: "",
    maxlength: 5000,
    disabled: false,
    customConfig: {},
  }
);

const emit = defineEmits<{
  update: [value: string];
}>();

const ckeditor = CKEditor.component;

const editorConfig: EditorConfig = {
  language: "en",
  // extraPlugins: [MyCustomUploadAdapterPlugin],
  plugins: [
    Essentials,
    Autoformat,
    Font,
    Bold,
    Italic,
    Underline,
    Indent,
    List,
    Paragraph,
    // Image,
    // AutoImage,
    // ImageToolbar,
    // ImageCaption,
    // ImageUpload,
    // ImageStyle,
    // ImageResize,
    // ImageResizeEditing,
    // ImageResizeHandles,
    Alignment,
  ],
  toolbar: {
    items: [
      "undo",
      "redo",
      "|",
      "fontSize",
      "fontColor",
      "indent",
      "bold",
      "italic",
      "underline",
      // "alignment",
      "bulletedList",
      "numberedList",
      // "uploadImage",
    ],
    shouldNotGroupWhenFull: true,
  },
  table: {
    contentToolbar: [
      "tableColumn",
      "tableRow",
      "mergeTableCells",
      "tableProperties",
      "tableCellProperties",
      "toggleTableCaption",
    ],
  },
  image: {
    styles: {
      options: [
        "inline",
        "alignLeft",
        "alignRight",
        "alignCenter",
        "alignBlockLeft",
        "alignBlockRight",
        "block",
        // "side",
      ],
    },
    resizeOptions: [
      {
        name: "resizeImage:original",
        label: "Original",
        value: null,
      },
      {
        name: "resizeImage:50",
        label: "25%",
        value: "25",
      },
      {
        name: "resizeImage:50",
        label: "50%",
        value: "50",
      },
      {
        name: "resizeImage:75",
        label: "75%",
        value: "75",
      },
    ],
    toolbar: [
      "imageTextAlternative",
      // "toggleImageCaption",
      "|",
      "imageStyle:inline",
      "imageStyle:wrapText",
      "imageStyle:breakText",
      // "imageStyle:side",
      "|",
      "resizeImage",
    ],
  },
  fontFamily: {
    supportAllValues: true,
    // options: [
    // 'default',
    // 'Arial, sans-serif, Ubuntu',
    // 'Ubuntu Mono, Courier New, Courier, monospace'
    // ]
  },
  fontSize: {
    options: [12, 14, "default", 18, 20, 22],
    supportAllValues: true,
  },
  fontColor: {
    colorPicker: {
      format: "hex",
    },
  },
  list: {
    properties: {
      styles: true,
      startIndex: true,
      reversed: true,
    },
  },
  wordCount: {
    onUpdate: (stats: any) => {
      // Prints the current content statistics.
      // console.log( `Characters: ${ stats.characters }\nWords: ${ stats.words }` );
      wordCount.value = stats.words;
      characterCount.value = stats.characters;
    },
  },
  // 更改默认配置项
  ...props.customConfig,
};

const wordCount = ref<number>(0);
const characterCount = ref<number>(0);

const contentValue = ref<string>("");
const handleUpdate = (value: string) => {
  contentValue.value = value;
  emit("update", value);
  // if (characterCount.value <= props.maxlength) {
  //   emit("update", value);
  // }
};
onBeforeMount(() => {
  // 更改toolbar的默认显示的配置项
  if (props.toolbarConfig) {
    editorConfig.toolbar = props.toolbarConfig;
  }
});
const onEditorReady = (editor: any) => {
  // isReadOnly模式下隐藏toolbar
  const toolbarElement = editor.ui.view.toolbar.element;
  if (editor.isReadOnly) {
    toolbarElement.style.display = "none";
  } else {
    toolbarElement.style.display = "flex";
  }
};
</script>

<template>
  <div style="position: relative;width: 100%;">
    <ckeditor
      ref="editorRef"
      :editor="ClassicEditor"
      :config="editorConfig"
      :model-value="modelValue"
      :disabled="disabled"
      @ready="onEditorReady"
      @update:modelValue="handleUpdate"
    ></ckeditor>
    <!-- <div class="ck ck-word-count" style="display: flex; font-size: 12px">
      <div class="ck-word-count__words">Words: {{ wordCount }}</div>
      <div class="ck-word-count__characters" style="margin-left: 20px">
        Characters: {{ characterCount }} / {{ props.maxlength }}
      </div>
    </div> -->
  </div>
</template>

<style scoped></style>
