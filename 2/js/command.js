class PromptTemplate {
    constructor(inputVariables, template) {
      this.inputVariables = inputVariables;
      this.template = template;
    }
  
    format(values) {
      let formattedTemplate = this.template;
      for (const variable of this.inputVariables) {
        const regex = new RegExp(`{${variable}}`, 'g');
        formattedTemplate = formattedTemplate.replace(regex, values[variable]);
      }
      return formattedTemplate;
    }    
}

class Command {
    constructor(openAIChat, name) {
          this.openAIChat = openAIChat;
          this.name = name;
    }
  
    execute(thought, reason, criticism, speaker, history) {
      throw new Error("Abstract method 'execute' must be implemented in derived classes.");
    }
  
      handleResponse(res, addLine) {
          addLine(res.data.choices[0].message.content)
      }
  
    execute_general(history, instruct, useGPT4=false) {
      return new Promise((resolve, reject) => {
        console.log(instruct);
  
        let prompt = [] // history.slice(0, -1);
        prompt.push({ role: "user", content: instruct });
  
        this.openAIChat.chat(prompt, (res) => {
          if (!res.data.choices || res.data.choices.length == 0) {
            reject(res);
          } else {
            resolve(res);
          }
        }, (err) => {
          console.error(err) // 打印错误信息，例如{errMsg: 'request:fail'}
          reject(err);
        }, useGPT4);
      });
    }
  }