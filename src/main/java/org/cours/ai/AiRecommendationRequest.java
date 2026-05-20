package org.cours.ai;

public class AiRecommendationRequest {

    private Integer budget;
    private Integer anneeMin;
    private String marquePreferee;
    private String couleurPreferee;
    private String usage;

    public Integer getBudget() {
        return budget;
    }

    public void setBudget(Integer budget) {
        this.budget = budget;
    }

    public Integer getAnneeMin() {
        return anneeMin;
    }

    public void setAnneeMin(Integer anneeMin) {
        this.anneeMin = anneeMin;
    }

    public String getMarquePreferee() {
        return marquePreferee;
    }

    public void setMarquePreferee(String marquePreferee) {
        this.marquePreferee = marquePreferee;
    }

    public String getCouleurPreferee() {
        return couleurPreferee;
    }

    public void setCouleurPreferee(String couleurPreferee) {
        this.couleurPreferee = couleurPreferee;
    }

    public String getUsage() {
        return usage;
    }

    public void setUsage(String usage) {
        this.usage = usage;
    }
}